import Student from "../models/Student";

export default interface StudentService {
    addStudent(student: Student): boolean;

    findStudent(id: number): Student | Error;

    removeStudent(id: number): Student | Error;

    updateStudent(id: number, name: string, password: number): Student | Error;

    addScoreStudent(id: number, examName: string, score: number): boolean;
}