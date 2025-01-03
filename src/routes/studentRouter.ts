import express from "express";
import asyncHandler from 'express-async-handler';
import StudentServiceImpl from "../students/service/StudentServiceImpl";
import StudentController from "../students/controller/StudentController";
import StudentDto from "../students/dto/StudentDto";


const router = express.Router();
const studentService = new StudentServiceImpl();
const controller = new StudentController(studentService);

router.post("/student", asyncHandler(async (req, res) => {
    const studentDto = req.body as StudentDto;
    const isSuccess = controller.addStudent(studentDto);

    res.status(200).json({Status: isSuccess});
}));

export default router;