import * as fs from 'node:fs';
import Student from "../models/Student";


export default class StudentRepository {
    private readonly filePath: string;


    constructor(filePath: string = "./db.txt") {
        this.filePath = filePath;
    }

    readAll(): Student[] {
        try {
            const res = fs.readFileSync(this.filePath, "utf-8");

            return (JSON.parse(res) as Student[]).map(e => {
                const scoresMap = new Map(Object.entries(e.scores));
                return new Student(e.id, e.name, e.password, scoresMap);
            });
        } catch (err: any) {
            console.error("Repository :  -> " + err);
            return [];
        }
    }

    writeAll(arg: Student[]) {

        try {
            const data = JSON.stringify(arg, (key, value) => {
                if (value instanceof Map) {
                    return Object.fromEntries(value);
                }
                return value;
            }, 2);
            fs.writeFileSync(this.filePath, data, "utf-8");
            return true;
        } catch (err: any) {
            console.error("Repository :  -> " + err);
            return false;
        }
    }
}