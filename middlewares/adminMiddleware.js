import { env } from "../config/env.js";

export function requireAdminKey(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}