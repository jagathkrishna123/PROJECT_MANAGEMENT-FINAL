import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { getChatHistory, sendChatMessage, clearChatHistory } from "../controls/chat.js";

const router = express.Router();

router.get("/chat-history", verifyToken, getChatHistory);
router.post("/chat", verifyToken, sendChatMessage);
router.delete("/clear-chat", verifyToken, clearChatHistory);

export default router;
