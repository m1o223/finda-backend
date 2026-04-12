import Reminder from "../models/reminderModel.js";

import {
  createReminderSchema,
  updateReminderSchema
} from "../validators/reminderValidator.js";

import { scheduleReminder } from "../utils/reminderEngine.js";

//////////////////////////////////////////////////////////////
// UPDATE REMINDER
// PUT /api/reminders/:id
//////////////////////////////////////////////////////////////

export const updateReminder = async (req, res) => {

  try {

    const { id } = req.params;

    const { error, value } = updateReminderSchema.validate(req.body, {
      abortEarly: true,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const updatedReminder = await Reminder.findByIdAndUpdate(

      id,

      {
        title: value.title,
        date: value.date,
        time: value.time,
        remindBefore: value.remindBefore
      },

      { new: true }

    );

    if (!updatedReminder) {
      return res.status(404).json({
        message: "Reminder not found"
      });
    }

    return res.json(updatedReminder);

  } catch (error) {

    console.error("Update Reminder Error:", error);

    res.status(500).json({
      message: "Failed to update reminder"
    });

  }

};

//////////////////////////////////////////////////////////////
// CREATE REMINDER
// POST /api/reminders
//////////////////////////////////////////////////////////////

export const createReminder = async (req, res) => {

  try {

    const { error, value } = createReminderSchema.validate(req.body, {
      abortEarly: true
    });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const reminder = await Reminder.create({

      userId: req.user._id,

      title: value.title,

      description: value.description || "",

      date: value.date,

      time: value.time || { hour: 0, minute: 0 },

      recurring: value.recurring || null,

      sent: value.sent ?? false,

      isCompleted: value.isCompleted ?? false

    });

    //////////////////////////////////////////////////////
    // تشغيل التذكير
    //////////////////////////////////////////////////////

    scheduleReminder(reminder);

    return res.status(201).json(reminder);

  } catch (err) {

    console.error("createReminder error:", err);

    return res.status(500).json({
      message: "Server error"
    });

  }

};

//////////////////////////////////////////////////////////////
// GET ALL REMINDERS
// GET /api/reminders
//////////////////////////////////////////////////////////////

export const getReminders = async (req, res) => {

  try {

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);

    const limit = Math.min(parseInt(req.query.limit || "10", 10), 100);

    const skip = (page - 1) * limit;

    const filter = {
      userId: req.user._id
    };

    if (req.query.completed === "true") {
      filter.isCompleted = true;
    }

    if (req.query.completed === "false") {
      filter.isCompleted = false;
    }

    const [items, total] = await Promise.all([

      Reminder.find(filter)
        .sort({ date: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Reminder.countDocuments(filter)

    ]);

    return res.json({

      page,

      limit,

      total,

      pages: Math.ceil(total / limit),

      items

    });

  } catch (err) {

    console.error("getReminders error:", err);

    return res.status(500).json({
      message: "Server error"
    });

  }

};

//////////////////////////////////////////////////////////////
// GET SINGLE REMINDER
// GET /api/reminders/:id
//////////////////////////////////////////////////////////////

export const getReminderById = async (req, res) => {

  try {

    const reminder = await Reminder.findOne({

      _id: req.params.id,

      userId: req.user._id

    });

    if (!reminder) {

      return res.status(404).json({
        message: "Reminder not found"
      });

    }

    return res.json(reminder);

  } catch (err) {console.error("getReminderById error:", err);

    return res.status(400).json({
      message: "Invalid id"
    });

  }

};

//////////////////////////////////////////////////////////////
// TOGGLE COMPLETED
// PATCH /api/reminders/:id/toggle
//////////////////////////////////////////////////////////////

export const toggleReminder = async (req, res) => {

  try {

    const reminder = await Reminder.findOne({

      _id: req.params.id,

      userId: req.user._id

    });

    if (!reminder) {

      return res.status(404).json({
        message: "Reminder not found"
      });

    }

    reminder.isCompleted = !reminder.isCompleted;

    await reminder.save();

    return res.json(reminder);

  } catch (err) {

    console.error("toggleReminder error:", err);

    return res.status(400).json({
      message: "Invalid id"
    });

  }

};

//////////////////////////////////////////////////////////////
// DELETE REMINDER
// DELETE /api/reminders/:id
//////////////////////////////////////////////////////////////

export const deleteReminder = async (req, res) => {

  try {

    const reminder = await Reminder.findOneAndDelete({

      _id: req.params.id,

      userId: req.user._id

    });

    if (!reminder) {

      return res.status(404).json({
        message: "Reminder not found"
      });

    }

    return res.json({
      message: "Reminder deleted"
    });

  } catch (err) {

    console.error("deleteReminder error:", err);

    return res.status(400).json({
      message: "Invalid id"
    });

  }

};