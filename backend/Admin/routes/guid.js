import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import upload from "../../middleware/multer.js"
import { createGuide, updateGuide, deleteGuide, getGuideById, getGuideProfile, updateGuideProfile } from "../controls/Guide/guid.js"

const router = express.Router();


router.post("/createGuid", verifyToken, createGuide)
router.get("/getGuids", verifyToken, getGuideById)
router.put("/updateGuids/:id", verifyToken, updateGuide)
router.delete("/deleteGuids/:id", verifyToken, deleteGuide)
router.get("/getGuideProfile", verifyToken, getGuideProfile)
router.put("/updateGuideProfile", verifyToken, upload.single("file"), updateGuideProfile)

export default router;