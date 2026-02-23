import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import upload from "../../middleware/multer.js";

import { addStudent, getStudents, editStudent, deleteStudent, updateStudentProfile, getSudentProfile } from "../../Admin/controls/Students/student.js"

const router = express.Router();

router.post("/addStudent", verifyToken, addStudent)
router.get("/getStudents", verifyToken, getStudents)
router.put("/editStudents/:id", verifyToken, editStudent)
router.delete("/deleteStudents/:id", verifyToken, deleteStudent)
router.get("/getSudentProfile", verifyToken, getSudentProfile)
router.put("/update-Student-Profile",verifyToken, upload.single("file"), updateStudentProfile)


export default router;