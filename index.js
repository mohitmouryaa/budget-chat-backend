// IMPORTS
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const process = require("node:process");
require("dotenv").config({ path: ".env" });
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const { rateLimit } = require("express-rate-limit");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");

// UNCAUGHT EXCEPTION HANDLER
process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! shutting down....");
  process.exit(1);
});

// SERVER CONSTANTS
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES

app.use(
  cors({
    origin: "http://localhost:3001",
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// For limiting request from same IP address
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message: "Too many requeset from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

// Data Sanization againt NoSql Query Injection
app.use(mongoSanitize());

// Data Sanization  against XSS
app.use(xss());

// ROUTES IMPORTS
const userRouter = require("./routes/user.route");
const commandRouter = require("./routes/command.route");
const chatsRouter = require("./routes/chat.route");
const assetRouter = require("./routes/asset.route");
const expenditureRouter = require("./routes/expenditure.route");
const incomeRouter = require("./routes/income.route");
const transactionRouter = require("./routes/transaction.route");

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/commands", commandRouter);
app.use("/api/v1/chats", chatsRouter);
app.use("/api/v1/assets", assetRouter);
app.use("/api/v1/expenditures", expenditureRouter);
app.use("/api/v1/incomes", incomeRouter);
app.use("/api/v1/transactions", transactionRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

// DATABASE
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB connected successfully...");
  })
  .catch((err) => {
    console.error(err);
  });

// SERVER
const server = app.listen(port, () => {
  console.log(`Server listening at ${port} port...`);
});

// UNHANDLED REJECTION HANDLER
process.on("unhandledRejection", (err) => {
  console.error(err.name, err.message);
  console.log("UNHANDLED REJECTION! shutting down....");
  server.close(() => {
    process.exit(1);
  });
});
