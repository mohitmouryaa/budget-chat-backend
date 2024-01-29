const Asset = require("../models/assets.model");
const catchAsync = require("../utils/catchAsync");

exports.createAsset = catchAsync(async (req, res, next) => {
  const newAsset = await Asset.create(req.body);
  res.status(201).json({
    status: "success",
    asset: newAsset,
  });
});
