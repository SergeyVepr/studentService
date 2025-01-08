import StudentService from "./StudentService";
import Student from "../models/Student";
import StudentRepository from "../dao/StudentRepository";


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
        const res = student.filter(s => s.id === id)
        if (res.length !== 0) {
            return res[0];
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
        const index = students.findIndex(s => s.id === id);
        if(index > -1) {
            students[index].scores.set(examName,score);
            this.repository.writeAll(students);
            return true;
        }
        return false;
    }

    findStudentByName(name: string): Student[] | Error {
        const students = this.repository.readAll();
        const res = students.filter(s => s.name.toLowerCase() === name.toLowerCase());
        if(res.length > 0) {
           return  res;
        }else{
            return new Error();
        }

    }

    findStudentsByMinScore(exam: string, minScore: number): Student[] | Error {
        const students = this.repository.readAll();
        const res = students.filter(s => {
            if(s.scores.has(exam.toLowerCase())){
                if(s.scores.get(exam.toLowerCase())! >= minScore){
                    return true;
                }
            }else{
                return false;
            }
        });
        return res.length >= 0? res : new Error;
    }

}