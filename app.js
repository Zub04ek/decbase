const express = require("express");
const { tasksRouter } = require("./routes/taskRouter");

const app = express();
app.use("/tasks", tasksRouter);
app.use((err, req, res, next) => {
  console.log("err", JSON.stringify(err.message, null, 2));
  //   const { message = "Something went wrong, please try again later" } = err;
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong, please try again later",
  });
});

module.exports = { app };
