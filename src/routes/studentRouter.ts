import express from "express";
import asyncHandler from 'express-async-handler';
import StudentServiceImpl from "../students/service/StudentServiceImpl";
import StudentController from "../students/controller/StudentController";
import StudentDto from "../students/dto/StudentDto";
import Student from "../students/models/Student";


const router = express.Router();
const studentService = new StudentServiceImpl();
const controller = new StudentController(studentService);

router.post("/student", asyncHandler(async (req, res) => {
    const studentDto = req.body as StudentDto;
    const isSuccess = controller.addStudent(studentDto);
    res.status(200).json({Status: isSuccess});
}));

router.get("/student/:id", asyncHandler(async (req, res) => {
    const {id} = req.params;
    const result = controller.findStudent(+id);
    if(result instanceof Error){
        res.status(409).json({Error: result});
    }else{
        res.status(200).json({Status: result});
    }
}));

router.delete("/student/:id", asyncHandler(async (req, res) => {
    const {id} = req.params;
    const result = controller.removeStudent(+id);
    if(result instanceof Error){
        res.status(404).json({Error: result});
    }else{
        res.status(200).json({student : result});
    }
}));


router.put("/student/:id", asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name, password} = req.body;

    const result = controller.updateStudent(+id, name, +password);
    if(result instanceof Error){
        res.status(404).json({Error: result});
    }else{
        res.status(200).json({Status: result});
    }
}));


router.put("/score/student/:id", asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {examName,scores} = req.body;
    const result = controller.addScoreStudent(+id, examName, +scores);
    if(!result){
        res.status(404).json({Error: result});
    }else{
        res.status(200).json({Status: result});
    }
}))

export default router;