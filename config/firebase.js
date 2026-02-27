import admin from "firebase-admin";
import fs from "fs";
import { env } from "./env.js";

if (!admin.apps.length) {
  if (!env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_PATH not set in .env");
  }

  const raw = fs.readFileSync(env.FIREBASE_SERVICE_ACCOUNT_PATH, "utf8");
  const serviceAccount = JSON.parse(raw);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };