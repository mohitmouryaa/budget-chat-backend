const catchAsync = require("../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});
