const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { HTTPError } = require("../utils/HTTPError");

const writeDb = async (tasks) => {
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
};

// const tasksPath = path.join(__dirname, 'db', "tasks.json");
const tasksPath = path.join(process.cwd(), "db", "tasks.json");

const getTasks = async () => {
  const tasks = await fs.readFile(tasksPath);
  return JSON.parse(tasks);
};

const getTaskByID = async (taskId) => {
  const tasks = await getTasks();
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    throw new HTTPError(404);
  }
};

const addTask = async (taskData) => {
  const newTask = {
    id: crypto.randomUUID(),
    ...taskData,
  };
  const tasks = await getTasks();
  tasks.push(newTask);
  await writeDb(tasks);
  return newTask;
};

const updateTask = async (taskId, data) => {
  const tasks = await getTasks();
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    throw new HTTPError(404);
  }
  tasks.splice(index, 1, { ...tasks[index], ...data });

  // tasks[index] = { ...tasks[index], ...data };

  //   oneTask.title = data.title || oneTask.title;
  //   oneTask.completed = data.completed || oneTask.completed;

  await writeDb(tasks);
  return tasks[index];
};

const deleteTask = async (taskId) => {
  const tasks = await getTasks();
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    throw new HTTPError(404);
  }
  tasks.splice(index, 1);
  await writeDb(tasks);
  return index;
};

module.exports = {
  getTasks,
  getTaskByID,
  addTask,
  updateTask,
  deleteTask,
};
