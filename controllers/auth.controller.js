const { OAuth2Client } = require("google-auth-library");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const client = new OAuth2Client();

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
    data: { user },
  });
};

exports.googleAuth = catchAsync(async (req, res, next) => {
  const { credential, client_id } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: client_id,
  });
  const payload = ticket.getPayload();
  const newUser = await User.create(payload);
  createAndSendToken(newUser, 201, res);
});