const express = require("express");
const { authRouter } = require("./authRouter");
const { taskRouter } = require("./taskRouter");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/tasks", taskRouter);

module.exports = {
  rootRouter: router,
};
