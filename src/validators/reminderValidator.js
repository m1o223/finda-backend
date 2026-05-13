import Joi from "joi";

// =========================
// CREATE REMINDER SCHEMA
// =========================
export const createReminderSchema = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().allow("").optional(),

  date: Joi.date().required(),

  time: Joi.object({
    hour: Joi.number().min(0).max(23).required(),
    minute: Joi.number().min(0).max(59).required(),
  }).required(),
  
 remindBefore: Joi.number()
  .valid(5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60)
  .optional(),


  recurring: Joi.string()
    .valid("daily", "weekly", "monthly", null)
    .optional(),
});


// =========================
// UPDATE REMINDER SCHEMA
// =========================
export const updateReminderSchema = Joi.object({
  title: Joi.string().optional(),

  description: Joi.string().allow("").optional(),

  date: Joi.date().optional(),

  time: Joi.object({
    hour: Joi.number().min(0).max(23).required(),
    minute: Joi.number().min(0).max(59).required(),
  }).optional(),

  recurring: Joi.string()
    .valid("daily", "weekly", "monthly", null)
    .optional(),

  isCompleted: Joi.boolean().optional(),
});