import Reminder from "../models/reminderModel.js";
import { sendPushNotification } from "./notificationService.js";

//////////////////////////////////////////////////////////////////
// تشغيل نظام التذكيرات
//////////////////////////////////////////////////////////////////

export function scheduleReminder(reminder) {
  try {
    console.log("Scheduling reminder:", reminder.title);

    const reminderDate = new Date(reminder.date);

    const now = new Date();

    const delay = reminderDate.getTime() - now.getTime();

    // إذا الوقت انتهى
    if (delay <= 0) {
      console.log("Reminder time already passed");
      return;
    }

    //////////////////////////////////////////////////////////////
    // تشغيل التذكير بالوقت المحدد
    //////////////////////////////////////////////////////////////

    setTimeout(async () => {
      try {

        console.log("Sending reminder:", reminder.title);

        //////////////////////////////////////////////////////////
        // إرسال إشعار
        //////////////////////////////////////////////////////////

        await sendPushNotification(
          reminder.userId,
          "🔔 Reminder",
          reminder.title
        );

        //////////////////////////////////////////////////////////
        // تحديث حالة التذكير
        //////////////////////////////////////////////////////////

        await Reminder.findByIdAndUpdate(
          reminder._id,
          {
            sent: true,
          }
        );

        console.log("Reminder sent successfully");

      } catch (error) {
        console.error("Reminder send error:", error);
      }

    }, delay);

  } catch (error) {
    console.error("scheduleReminder error:", error);
  }
}

//////////////////////////////////////////////////////////////////
// تشغيل scheduler عام
//////////////////////////////////////////////////////////////////

export function startReminderScheduler() {

  console.log("Reminder Scheduler Started");

  setInterval(async () => {

    try {

      const now = new Date();

      ////////////////////////////////////////////////////////////
      // جلب كل التذكيرات غير المرسلة
      ////////////////////////////////////////////////////////////

      const reminders = await Reminder.find({
        sent: false,
      });

      for (const reminder of reminders) {

        const reminderDate = new Date(reminder.date);

        //////////////////////////////////////////////////////////
        // إذا وصل الوقت
        //////////////////////////////////////////////////////////

        if (reminderDate <= now) {

          try {

            console.log("Auto sending:", reminder.title);

            await sendPushNotification(
  reminder.userId,
  "🔔 تذكير",
  reminder.description || reminder.title
);

            reminder.sent = true;

            await reminder.save();

            console.log("Reminder completed");

          } catch (error) {

            console.error(
              "Failed sending reminder:",
              error
            );
          }
        }
      }

    } catch (error) {

      console.error(
        "Scheduler global error:",
        error
      );
    }
  }, 60000); // Check every minute
}
