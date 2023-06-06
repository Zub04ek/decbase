const { HTTPError } = require("../utils/HTTPError");
const { Task } = require("../models/Task");

const getTasks = async (page, limit) => {
  const skip = (page - 1) * limit;
  return await Task.find().limit(limit).skip(skip);
};

const getTaskByID = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new HTTPError(404)
  }
  return task;
};

const addTask = async (taskData) => {
  return await Task.create(taskData);
};

const updateTask = async (taskId, data) => {
  const task = await Task.findByIdAndUpdate(taskId, data, {new: true});
  if (!task) {
    throw new HTTPError(404)
  }
  return task;
};

const deleteTask = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    throw new HTTPError(404)
  }
  return taskId;
};

module.exports = {
  getTasks,
  getTaskByID,
  addTask,
  updateTask,
  deleteTask,
};
