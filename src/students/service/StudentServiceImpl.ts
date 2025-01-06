import StudentService from "./StudentService";
import Student from "../models/Student";
import StudentRepository from "../dao/StudentRepository";
import {ca} from "date-fns/locale";

export default class StudentServiceImpl implements StudentService {
    private repository: StudentRepository = new StudentRepository();

    addStudent(student: Student): boolean {
        const students = this.repository.readAll();
        if (students.find(s => s.id === student.id)) {
            return false;
        }
        students.push(student);
        return this.repository.writeAll(students);
    }

    findStudent(id: number): Student | Error {
        const student = this.repository.readAll();
        const res = student.find(s => s.id === id)
        if (res) {
            return res;
        } else {
            throw new Error(`${id} not found`);
        }

    }

    removeStudent(id: number): Student | Error {
        const student = this.repository.readAll();
        const index = student.findIndex(s => s.id === id);
        const result = student.splice(index, 1);
        if (index > -1) {
            this.repository.writeAll(student);
            return result[0];

        } else {
            throw new Error(`${id} not found`);
        }

    }

    updateStudent(id: number, name: string, password: number): Student | Error {
        const student = this.repository.readAll();

        const index = student.findIndex(s => s.id === id);
        if (index > -1) {
            const victim = new Student(student[index].id, student[index].name,
                student[index].password, student[index].scores);
            student[index].name = name;
            student[index].password = password;
            this.repository.writeAll(student);
            return victim;
        } else {
            throw new Error(`${id} not found`);
        }
    }

    addScoreStudent(id: number, examName: string, score: number): boolean {
        const students = this.repository.readAll();
        const student = students.find(s => s.id === id);
        if (!student) {
            throw new Error(`${id} not found`);
        }

        student.addScore(examName, score)
        this.repository.writeAll(students);
        return true;

    }

}