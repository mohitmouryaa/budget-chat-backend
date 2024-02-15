const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  //   .match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((ele) => {
    return ele.message;
  });
  const message = `Input message data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJwtExpiredError = () => {
  return new AppError("Your token has expired. Please log in again!", 401);
};

const handleJwtError = () => {
  return new AppError("Invalid token. Please log in again!", 401);
};

const sendErrorDev = (err, req, res) => {
  // FOR API
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    // FOR RENDERED WEBSITE
    res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // A) FOR API
  if (req.originalUrl.startsWith("/api")) {
    // OPERATIONAL, TRUSTED ERRORS : send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // PROGRAMMING OR OTHER UNKNOWN ERROS : don't leak error details
    // 1) LOG ERROR
    console.error(`ERROR 💥💥💥 `, err);

    // 2) SEND MESSAGE TO CLIENT
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
  //  RENDERED WEBSITE
  // OPERATIONAL, TRUSTED ERRORS : send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  // PROGRAMMING OR OTHER UNKNOWN ERROS : don't leak error details
  // 1) LOG ERROR
  console.error(`ERROR 💥💥💥 `, err);

  // 2) SEND MESSAGE TO CLIENT
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error._message === "Validation failed") error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJwtError();
    if (error.name === "TokenExpiredError") error = handleJwtExpiredError();

    sendErrorProd(error, req, res);
  }

  next();
};
