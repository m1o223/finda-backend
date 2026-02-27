import { db } from "../config/firebase.js";
import admin from "firebase-admin";

export async function saveDeviceToken(uid, token) {
  await db.collection("users").doc(uid).update({
    fcmToken: token
  });
}

export async function sendPushNotification(token, title, body) {
  await admin.messaging().send({
    token,
    notification: {
      title,
      body
    }
  });
}