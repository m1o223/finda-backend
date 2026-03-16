import { getOrCreateUser } from "../services/userService.js";

export async function checkMessageLimit(req, res, next) {
  try {
    const { uid, email } = req.body || {};

    if (!uid || !email) {
      return res.status(400).json({ error: "uid and email required" });
    }

    const user = await getOrCreateUser(uid, email);

    req.uid = uid;
    req.userDoc = user;

    if (user.plan === "free" && user.messagesUsed >= 20) {
      return res.status(403).json({
        error: "Free plan message limit reached",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
}