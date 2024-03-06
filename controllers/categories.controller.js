const AssetCategory = require("../models/assetsCategories.model");
const ExpenditureCategory = require("../models/expenditureCategories.model");
const catchAsync = require("./../utils/catchAsync");
const { saveChat } = require("./chat.controller");

exports.createAssetCategories = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const doc = await AssetCategory.create({
    name: name,
    userId: req.user.id,
  });

  const category = await doc.populate("user");
  const text = `You have entered a new asset category named ${name}`;
  const payload = {
    type: "message",
    message: {
      text,
    },
    by: "system",
  };
  const { messages: chats } = await saveChat({ userId: req.user.id, payload: [{ ...payload }] });
  res.status(201).json({
    status: "success",
    category,
    chats,
  });
});

exports.createExpenditureCategories = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const doc = await ExpenditureCategory.create({
    name: name,
    userId: req.user.id,
  });

  const category = await doc.populate("user");
  const text = `You have entered a new expenditure category named ${name}`;
  const payload = {
    type: "message",
    message: {
      text,
    },
    by: "system",
  };
  const { messages: chats } = await saveChat({ userId: req.user.id, payload: [{ ...payload }] });
  res.status(201).json({
    status: "success",
    category,
    chats,
  });
});

exports.getAssetsCategories = async () => {
  try {
    const categoriesList = await AssetCategory.find({}).select("-__v");
    return categoriesList;
  } catch (err) {
    return [];
  }
};

exports.getExpenditureCategories = async (user) => {
  try {
    const categoriesList = await ExpenditureCategory.find({
      $or: [{ role: "admin" }, { user: user.id }],
    }).select("-__v");
    return categoriesList;
  } catch (err) {
    return [];
  }
};
