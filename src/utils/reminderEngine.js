import Reminder from "../models/reminderModel.js"

const scheduledReminders = new Map()

export const scheduleReminder = async (reminder) => {

 try {

const date = new Date(reminder.date)

if (reminder.time) {
  date.setHours(reminder.time.hour || 0)
  date.setMinutes(reminder.time.minute || 0)
  date.setSeconds(0)
}

if (reminder.remindBefore) {
  date.setMinutes(date.getMinutes() - reminder.remindBefore)
}

  const now = new Date()

  const delay = date.getTime() - now.getTime()

  if (delay <= 0) return

  const timeout = setTimeout(async () => {

   console.log("Reminder triggered:", reminder.title)

   await Reminder.findByIdAndUpdate(reminder._id,{
    sent:true
   })

   scheduledReminders.delete(reminder._id.toString())

  }, delay)

  scheduledReminders.set(reminder._id.toString(), timeout)

 }
 catch(err){
  console.error("scheduleReminder error:", err)
 }

}

export const cancelReminder = (id) => {

 const timeout = scheduledReminders.get(id)

 if(timeout){
  clearTimeout(timeout)
  scheduledReminders.delete(id)
 }

}