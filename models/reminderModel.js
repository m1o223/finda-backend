// models/reminderModel.js

const { db } = require("../firebase");

const createReminder = async (userId, data) => {
  const reminder = {
    userId,
    title: data.title,
    description: data.description || "",
    date: data.date,
    createdAt: new Date()
  };

  const docRef = await db.collection("reminders").add(reminder);
  return { id: docRef.id, ...reminder };
};

const getUserReminders = async (userId) => {
  const snapshot = await db
    .collection("reminders")
    .where("userId", "==", userId)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

module.exports = {
  createReminder,
  getUserReminders
};