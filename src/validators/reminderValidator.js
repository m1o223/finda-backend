import Joi from "joi"

export const createReminderSchema = Joi.object({
title: Joi.string().required(),
description: Joi.string().allow("").optional(),
date: Joi.date().required(),
time: Joi.object({
hour: Joi.number().min(0).max(23).required(),
minute: Joi.number().min(0).max(59).required()
}),
recurring: Joi.string().valid("daily","weekly","monthly",null)
})

export const updateReminderSchema = Joi.object({
title: Joi.string(),
description: Joi.string().allow(""),
date: Joi.date(),
time: Joi.object({
hour: Joi.number().min(0).max(23),
minute: Joi.number().min(0).max(59)
}),
recurring: Joi.string().valid("daily","weekly","monthly",null),
isCompleted: Joi.boolean()
})