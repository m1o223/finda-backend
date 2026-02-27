import { db } from "../config/firebase.js";

export async function createReminder(data) {
  await db.collection("reminders").add({
    ...data,
    active: true,
    createdAt: new Date()
  });
}

export async function getActiveReminders() {
  const snapshot = await db.collection("reminders")
    .where("active", "==", true)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}