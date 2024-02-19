const { OAuth2Client } = require("google-auth-library");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const client = new OAuth2Client();
const { promisify } = require("util");
const process = require("node:process");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("chatpass", token, cookieOptions);

  // REMOVE PASSWORD FROM OUTPUT
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //  1) Chech if email or password exist
  if (!email || !password) {
    return next(new AppError("Please provide your email or password!"));
  }
  //   2) Check if user exists & password is valid
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }
  //   3) If everything ok, send token to client
  createAndSendToken(user, 200, res);
});

exports.googleAuth = catchAsync(async (req, res, next) => {
  const { credential, client_id } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: client_id,
  });
  const payload = ticket.getPayload();
  const user = await User.findOne({ email: payload.email });
  if (user) {
    createAndSendToken(user, 200, res);
  } else {
    const newUser = await User.create({
      ...payload,
      password: process.env.GOOGLE_AUTH_PASSWORD,
      passwordConfirm: process.env.GOOGLE_AUTH_PASSWORD,
    });
    createAndSendToken(newUser, 201, res);
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  //   2)  Token Verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The user belonging to the token does no longer exists!", 401));
  }

  //   4) Check if user changed password after the token was issued
  if (currentUser.changesPasswordAfter(decoded.iat)) {
    return next(new AppError("User has recently changed password! Please Log in again."), 401);
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
