const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

const { rootRouter } = require("./routers");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const { notFoundHandler } = require("./middlewares/notFoundHandler");

const app = express();
app.use(cors());
app.use(helmet());

const formatLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatLogger));

app.use(express.json());

app.use("/", rootRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = { app };
