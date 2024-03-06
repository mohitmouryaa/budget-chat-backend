const catchAsync = require("../utils/catchAsync");
const Asset = require("./../models/asset.model");
const { saveChat } = require("./chat.controller");

exports.createAsset = catchAsync(async (req, res, next) => {
  const { name, amount: balance, category } = req.body;
  const doc = await Asset.create({
    name,
    balance,
    category,
    userId: req.user.id,
  });
  const asset = await doc.populate("category");
  const text = `You have entered a new asset named ${name} with the balance of ${balance} in the category of ${asset.category.name}`;
  const payload = {
    type: "message",
    message: {
      text,
    },
    by: "system",
  };
  const chats = await saveChat({ userId: req.user.id, payload: [{ ...payload }] });
  res.status(201).json({
    status: "success",
    message: "Asset added successfully",
    asset,
    chats: chats.messages,
  });
});

exports.getAllAssets = catchAsync(async (req, res, next) => {
  const assets = await Asset.find({}).populate("category");
  res.status(200).json({
    status: "success",
    assets,
  });
});
