const {
  getTasks,
  getTaskByID,
  addTask,
  updateTask,
  deleteTask,
} = require("../services/taskServices");
const { asyncWrapper } = require("../utils/asyncWrapper");

const getTasksController = asyncWrapper(async (req, res) => {
  const { page = 1, limit = 10, completed } = req.query;
  const { _id: ownerId } = req.user;
  const tasks = await getTasks(page, limit, completed, ownerId);
  res.json(tasks);
});

const getTaskByIDController = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const { _id: ownerId } = req.user;
  const oneTask = await getTaskByID(taskId, ownerId);
  console.log("req.params", req.params);
  res.json(oneTask);
});

const addTaskController = asyncWrapper(async (req, res) => {
  const { _id: ownerId } = req.user;
  const newTask = await addTask(req.body, ownerId);
  res.status(201).json(newTask);
});

const updateTaskController = asyncWrapper(async (req, res) => {
  const { _id: ownerId } = req.user;
  const { taskId } = req.params;
  const updatedTask = await updateTask(taskId, req.body, ownerId);
  res.status(200).json(updatedTask);
});

const deleteTaskController = asyncWrapper(async (req, res) => {
  const { _id: ownerId } = req.user;
  const { taskId } = req.params;
  const deletedTaskId = await deleteTask(taskId, ownerId);
  res.sendStatus(204);
  return deletedTaskId;
});

module.exports = {
  getTasksController,
  getTaskByIDController,
  addTaskController,
  updateTaskController,
  deleteTaskController,
};
