import StudentService from "./StudentService";
import Student from "../models/Student";
import StudentRepository from "../dao/StudentRepository";

export default class StudentServiceImpl implements StudentService {
    private repository: StudentRepository = new StudentRepository();

    addStudent(student: Student): boolean {
        const students = this.repository.readAll();
        if(students.find(s => s.id === student.id)) {
            throw new Error("Student already exists");
        }
        students.push(student);
        return this.repository.writeAll(students);
    }

}