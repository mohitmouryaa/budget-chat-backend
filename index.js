// IMPORTS
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const process = require("node:process");
require("dotenv").config({ path: "./.env" });

// UNCAUGHT EXCEPTION HANDLER
process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! shutting down....");
  process.exit(1);
});

// SERVER CONSTANTS
const app = express();
const DB = process.env.DATABASE;
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

app.use(express.json({ limit: "10kb" }));

// ROUTES IMPORTS
const userRouter = require("./routes/user.route");
const commandRouter = require("./routes/command.route");
const categoriesRouter = require("./routes/categories.route");
const chatsRouter = require("./routes/chat.route");

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/commands", commandRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/chats", chatsRouter);

app.get("/", (req, res) => {
  res.send("HELLO");
});

// DATABASE
mongoose
  .connect(DB)
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
