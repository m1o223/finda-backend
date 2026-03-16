import admin from "firebase-admin"
import User from "../models/userModel.js"

export async function sendPushNotification(userId, title, body) {

  try {

    const user = await User.findById(userId)

    if (!user || !user.fcmToken) {
      console.log("⚠️ User has no FCM token")
      return
    }

    const message = {
      token: user.fcmToken,
      notification: {
        title: title,
        body: body
      }
    }

    await admin.messaging().send(message)

    console.log("✅ Notification sent")

  } catch (error) {

    console.error("❌ Notification error:", error)

  }

}