import { auth } from "../config/firebase.js";

export async function verifyFirebaseToken(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      req.auth = null; // السماح ببعض الروتات تكون عامة إذا بدك
      return next();
    }

    const decoded = await auth.verifyIdToken(token);
    req.auth = decoded; // { uid, email, ... }
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}