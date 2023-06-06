const express = require("express");
const {
  getTasksController,
  getTaskByIDController,
  addTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/tasksControllers");
const { validateBody } = require("../utils/validation/validateBody");
const { createTaskValidationSchema, updateTaskValidationSchema } = require("../utils/validation/tasksValidationSchemas");

const router = express.Router();

router.route("/").get(getTasksController).post(validateBody(createTaskValidationSchema), addTaskController);

router
  .route("/:taskId")
  .get(getTaskByIDController)
  .patch(validateBody(updateTaskValidationSchema), updateTaskController)
  .delete(deleteTaskController);

module.exports = {
  tasksRouter: router,
};
