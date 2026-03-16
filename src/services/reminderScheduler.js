import Reminder from "../models/reminderModel.js"
import { sendPushNotification } from "./notificationService.js"

export function startReminderScheduler() {

  setInterval(async () => {

    try {

      const now = new Date()

      const reminders = await Reminder.find({
        date: { $lte: now },
        sent: false
      })

      for (const reminder of reminders) {

        await sendPushNotification(
          reminder.userId,
          "🔔 تذكير",
          reminder.text
        )

        reminder.sent = true
        await reminder.save()

      }

    } catch (error) {

      console.error("Scheduler error:", error)

    }

  }, 60000)

}