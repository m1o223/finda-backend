export const parseReminderDateTime = (date, time) => {

 const reminderDate = new Date(date)

 if(time){
  reminderDate.setHours(time.hour || 0)
  reminderDate.setMinutes(time.minute || 0)
  reminderDate.setSeconds(0)
 }

 return reminderDate

}

export const getDelayFromNow = (reminderDate) => {

 const now = new Date()

 return reminderDate.getTime() - now.getTime()

}