const {
  getTasks,
  getTaskByID,
  addTask,
  updateTask,
  deleteTask,
} = require("../services/taskServices");
const { asyncWrapper } = require("../utils/asyncWrapper");

const getTasksController = asyncWrapper(async (req, res) => {
  const { page=1, limit=10, completed } = req.query;
  const tasks = await getTasks(page, limit, completed);
  res.json(tasks);
});

const getTaskByIDController = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const oneTask = await getTaskByID(taskId);
  console.log("req.params", req.params);
  res.json(oneTask);
});

const addTaskController = asyncWrapper(async (req, res) => {
  const newTask = await addTask(req.body);
  console.log("req.body", req.body);
  res.status(201).json(newTask);
});

const updateTaskController = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const updatedTask = await updateTask(taskId, req.body);
  res.status(200).json(updatedTask);
});

const deleteTaskController = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const deletedTaskId = await deleteTask(taskId);
  //   res.status(204).json({ id: deletedTaskId });
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
