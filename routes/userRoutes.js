import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getOrCreateUser } from "../services/userService.js";

export const userRoutes = Router();

/**
 * GET /user/:uid
 */
userRoutes.get(
  "/user/:uid",
  asyncHandler(async (req, res) => {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({ error: "uid required" });
    }

    const user = await getOrCreateUser(uid);

    res.json({
      success: true,
      user,
    });
  })
);