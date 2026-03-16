import { db } from "../config/firebase.js";

/**
 * Create user if not exists
 */
export async function ensureUser(uid, email = null) {
  if (!uid) {
    throw new Error("uid is required");
  }

  const userRef = db.collection("users").doc(uid);
  const doc = await userRef.get();

  if (!doc.exists) {
    const newUser = {
      uid,
      email: email || null,
      plan: "free",
      messagesUsed: 0,
      createdAt: new Date(),
    };

    await userRef.set(newUser);
    return newUser;
  }

  return doc.data();
}

/**
 * Old compatibility function (used by userRoutes)
 */
export async function getOrCreateUser(uid, email = null) {
  return ensureUser(uid, email);
}

/**
 * Increment usage
 */
export async function incrementUsage(uid, amount = 1) {
  if (!uid) {
    throw new Error("uid is required");
  }

  const admin = await import("firebase-admin");

  await db.collection("users").doc(uid).update({
    messagesUsed: admin.default.firestore.FieldValue.increment(amount),
  });
}