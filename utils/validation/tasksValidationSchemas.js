const Joi = require("joi");

const createTaskValidationSchema = Joi.object({
    title: Joi.string().required().min(6).max(100),
    completed: Joi.boolean()
})

const updateTaskValidationSchema = Joi.object().keys({
    title: createTaskValidationSchema.extract("title").optional(),
    completed: createTaskValidationSchema.extract("completed").optional()
}).or("title", "completed");

module.exports = {
    createTaskValidationSchema,
    updateTaskValidationSchema
}