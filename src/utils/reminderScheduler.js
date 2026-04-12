import Reminder from "../models/reminderModel.js"
import { scheduleReminder } from "./reminderEngine.js"

export const loadScheduledReminders = async () => {

 try {

  console.log("Loading reminders...")

  const reminders = await Reminder.find({
   sent: false
  })

  for (const reminder of reminders) {

   await scheduleReminder(reminder)

  }

  console.log(`${reminders.length} reminders scheduled`)

 } 
 catch (err) {

  console.error("Error loading reminders:", err)

 }

}