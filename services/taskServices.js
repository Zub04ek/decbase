const { HTTPError } = require("../utils/HttpError");
const { Task } = require("../models/Task");

const getTasks = async (page, limit, completed, ownerId) => {
  const skip = (page - 1) * limit;
  const filter = { owner: ownerId };
  if (completed === "true") {
    filter.completed = true;
  }
  if (completed === "false") {
    filter.completed = false;
  }
  return await Task.find(filter).limit(limit).skip(skip);
};

const getTaskByID = async (taskId, ownerId) => {
  const task = await Task.findOne({ _id: taskId, owner: ownerId });
  if (!task) {
    throw new HTTPError(404);
  }
  return task;
};

const addTask = async (taskData, ownerId) => {
  return await Task.create({ ...taskData, owner: ownerId });
};

const updateTask = async (taskId, data, ownerId) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, owner: ownerId },
    data,
    { new: true }
  );
  if (!task) {
    throw new HTTPError(404);
  }
  return task;
};

const deleteTask = async (taskId, ownerId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, owner: ownerId });
  if (!task) {
    throw new HTTPError(404);
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
