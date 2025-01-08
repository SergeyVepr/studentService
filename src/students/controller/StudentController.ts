import StudentService from "../service/StudentService";

import StudentDto from "../dto/StudentDto";
import Student from "../models/Student";
import StudentNotPasswordDto from "../dto/StudentNotPasswordDto";
import {id} from "date-fns/locale";


export default class StudentController {
    private service: StudentService;

    constructor(service: StudentService) {
        this.service = service;
    }

    addStudent(studentDto: StudentDto): boolean {
        const student: Student = new Student(studentDto.id, studentDto.name, studentDto.password,
            studentDto.scores as Map<string, number> || new Map<string, number>());
        return this.service.addStudent(student);
    }

    findStudent(id: number): StudentNotPasswordDto | Error {
        const res = this.service.findStudent(id);

        if (res instanceof Student) {
            const newScore = Object.fromEntries(res.scores)

            return new StudentNotPasswordDto(res.id, res.name, newScore);
        } else {
            return new Error("4011");
        }


    }

    removeStudent(id: number) {
        const res = this.service.removeStudent(id);
        if (res instanceof Student) {
            return new StudentNotPasswordDto(res.id, res.name, Object.fromEntries(res.scores));
        } else {
            return new Error("Not found Student with id " + id);
        }
    }

    updateStudent(id: number, name: string, password: number): StudentNotPasswordDto | Error {
        const res = this.service.updateStudent(id, name, password);
        if (res instanceof Student) {
            return new StudentNotPasswordDto(res.id, res.name, Object.fromEntries(res.scores));
        } else {
            return new Error("Not found Student with id " + id);
        }
    }

    addScoreStudent(id: number, examName: string, score: number): boolean {

        return this.service.addScoreStudent(id, examName, score);
    }

    findStudentByName(name: string): StudentNotPasswordDto[] | Error {
        const students = this.service.findStudentByName(name);
        const res = [];
        if (students instanceof Array) {
            for (let i = 0; i < students.length; i++) {
                res[i] = new StudentNotPasswordDto(students[i].id, students[i].name, Object.fromEntries(students[i].scores))
            }
            return res;
        } else {
            return new Error("Not found Student with name" + name);
        }
    }

    findStudentByMinScore(exam: string, minScore: number): StudentNotPasswordDto[] | Error{
        const students = this.service.findStudentsByMinScore(exam, minScore);
        if (students instanceof Array) {
            return students.map(e => new StudentNotPasswordDto(e.id, e.name, Object.fromEntries(e.scores)));
        }else{
            return new Error("Not found Student with exam" + exam);
        }

    }
}