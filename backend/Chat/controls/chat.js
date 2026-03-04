import Chat from "../models/ChatSchema.js";
import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config();

const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY
});

// ----------------- GET CHAT HISTORY -----------------
export const getChatHistory = async (req, res) => {
    try {
        const userId = req.user.id?.id;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID not found" });
        }

        let chat = await Chat.findOne({ userId });

        if (!chat) {
            // Return empty array if no history exists yet
            return res.status(200).json({
                success: true,
                messages: [{ role: 'assistant', content: "Hello! I'm your AI assistant. How can I help you with your projects today?" }]
            });
        }

        res.status(200).json({
            success: true,
            messages: chat.messages
        });
    } catch (error) {
        console.error("Get Chat History Error:", error);
        res.status(500).json({ success: false, message: "Server error while fetching chat history" });
    }
};

// ----------------- SEND CHAT MESSAGE -----------------
export const sendChatMessage = async (req, res) => {
    try {
        const { messages: currentMessages } = req.body;
        const userId = req.user.id?.id;

        if (!userId) {
            return res.status(400).json({ error: "User ID not found" });
        }

        if (!currentMessages || !Array.isArray(currentMessages)) {
            return res.status(400).json({ error: "Messages are required." });
        }

        // Get the latest user message to send to AI
        const lastUserMessage = currentMessages
            .filter(msg => msg.role === "user")
            .slice(-1);

        if (lastUserMessage.length === 0) {
            return res.status(400).json({ error: "No user message found" });
        }

        // Get response from AI
        const response = await openrouter.chat.send({
            chatGenerationParams: {
                model: "openrouter/free",
                messages: lastUserMessage,
            }
        });

        const aiContent = response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

        // Save messages to database
        let chat = await Chat.findOne({ userId });
        if (!chat) {
            chat = new Chat({ userId, messages: [] });
        }

        // Add user message if not already present (prevents duplicates if frontend sends whole history)
        // Here we just append the last one and the AI response for simplicity, 
        // OR we can trust the currentMessages if it's the full history.
        // Let's assume frontend sends the latest message as the last item.

        const latestUserMsg = lastUserMessage[0];
        const aiMsg = { role: "assistant", content: aiContent };

        chat.messages.push(latestUserMsg);
        chat.messages.push(aiMsg);

        await chat.save();

        res.json({ content: aiContent });

    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({
            error: error.message || "AI request failed"
        });
    }
};

// ----------------- CLEAR CHAT HISTORY -----------------
export const clearChatHistory = async (req, res) => {
    try {
        const userId = req.user.id?.id;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID not found" });
        }

        await Chat.findOneAndDelete({ userId });

        res.status(200).json({
            success: true,
            message: "Chat history cleared successfully"
        });
    } catch (error) {
        console.error("Clear Chat Error:", error);
        res.status(500).json({ success: false, message: "Server error while clearing chat history" });
    }
};
