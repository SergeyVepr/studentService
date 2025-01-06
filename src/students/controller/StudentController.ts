import StudentService from "../service/StudentService";

import StudentDto from "../dto/StudentDto";
import Student from "../models/Student";


export default class StudentController {
    private service: StudentService;

    constructor(service: StudentService) {
        this.service = service;
    }

    addStudent(studentDto: StudentDto):boolean {
        const student : Student = new Student(studentDto.id, studentDto.name, studentDto.password,
                                            studentDto.scores as Map<string,number>);
        return this.service.addStudent(student);
    }

    findStudent(id: number): StudentDto | Error {
        const res = this.service.findStudent(id);

        if(res instanceof Student){
            const studentDto = new StudentDto(res.id, res.name, 0, res.scores );
            return studentDto;
        }else{
            return new Error("4011");
        }


    }

    removeStudent(id: number) {
        return this.service.removeStudent(id);
    }

    updateStudent(id: number, name: string, password: number): Student | Error {
        return this.service.updateStudent(id, name, password);
    }

    addScoreStudent(id: number, examName: string, score: number): boolean{

        return this.service.addScoreStudent(id, examName, score);
    }
}