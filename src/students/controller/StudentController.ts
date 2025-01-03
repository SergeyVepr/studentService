import StudentService from "../service/StudentService";

import StudentDto from "../dto/StudentDto";
import Student from "../models/Student";


export default class StudentController {
    private service: StudentService;

    constructor(service: StudentService) {
        this.service = service;
    }

    addStudent(studentDto: StudentDto):boolean {
        const student : Student = new Student(studentDto.id, studentDto.name,
                                            studentDto.scores as Map<string,number>);
        return this.service.addStudent(student);
    }

}