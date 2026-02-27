import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAIReply } from "../services/aiService.js";
import { incrementUsage } from "../services/userService.js";
import { checkMessageLimit } from "../middlewares/limitsMiddleware.js";

export const chatRoutes = Router();

/**
 * POST /chat
 * Body: { uid, message }
 */
chatRoutes.post(
  "/chat",
  asyncHandler(async (req, res) => {
    const { uid, message } = req.body || {};

    if (!uid || !message) {
      return res.status(400).json({
        error: "uid and message required",
      });
    }

    // check limit middleware (if used manually)
    await checkMessageLimit(req, res, () => {});

    // generate AI reply
    const reply = await generateAIReply(message);

    // increment usage
    await incrementUsage(uid, 1);

    res.json({
      success: true,
      reply,
    });
  })
);