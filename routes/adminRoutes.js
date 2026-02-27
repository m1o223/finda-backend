import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAdminKey } from "../middlewares/adminMiddleware.js";
import { db } from "../config/firebase.js";
import { ensureUser } from "../services/userService.js";

export const adminRoutes = Router();

adminRoutes.use(requireAdminKey);

// POST /admin/set-plan
// Body: { uid, plan }
adminRoutes.post(
  "/admin/set-plan",
  asyncHandler(async (req, res) => {
    const { uid, plan } = req.body || {};

    if (!uid || !plan) {
      return res.status(400).json({ error: "uid and plan required" });
    }

    // allowed plans
    const allowedPlans = ["free", "pro"];

    if (!allowedPlans.includes(plan)) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    await ensureUser(uid);

    await db.collection("users").doc(uid).update({
      plan,
    });

    res.json({ success: true, uid, plan });
  })
);

// POST /admin/reset-monthly
// Body: { uid }
adminRoutes.post(
  "/admin/reset-monthly",
  asyncHandler(async (req, res) => {
    const { uid } = req.body || {};

    if (!uid) {
      return res.status(400).json({ error: "uid required" });
    }

    await ensureUser(uid);

    await db.collection("users").doc(uid).update({
      messagesUsed: 0,
    });

    res.json({ success: true, uid, reset: true });
  })
);