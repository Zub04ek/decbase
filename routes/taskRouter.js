const express = require("express");
const {
  getTasksController,
  getTaskByIDController,
  addTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/tasksControllers");

const router = express.Router();

// Middleware

router.route("/").get(getTasksController).post(addTaskController);

router
  .route("/:taskId")
  .get(getTaskByIDController)
  .patch(updateTaskController)
  .delete(deleteTaskController);

module.exports = {
  tasksRouter: router,
};
