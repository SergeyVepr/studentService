import * as fs from 'node:fs';
import Student from "../models/Student";


export default class StudentRepository {
    private readonly filePath: string;


    constructor(filePath: string = "./db.txt") {
        this.filePath = filePath;
    }

    readAll(): Student[]{
        try{
            const res = fs.readFileSync(this.filePath, "utf-8");
            return (JSON.parse(res) as Student[]);
        }catch (err: any){
            console.error("Repository :  -> " + err);
            return [];
        }
    }
    writeAll(arg: Student[]){
        try{
            const data = JSON.stringify(arg,null,2);
            fs.writeFileSync(this.filePath, data, "utf-8");
            return true;
        }catch (err: any){
            console.error("Repository :  -> " + err);
            return false;
        }
    }
}