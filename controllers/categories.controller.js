const AssetCategory = require("../models/assetsCategories.model");
const ExpenditureCategory = require("../models/expenditureCategories.model");
const IncomeCategory = require("../models/incomeCategories.model");
const catchAsync = require("./../utils/catchAsync");
const { saveChat } = require("./chat.controller");

exports.createAssetCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const newCategory = { name: req.body.name };
  const category = await AssetCategory.findOneAndUpdate(
    { user: req.user.id },
    { $push: { categories: newCategory } },
    { upsert: true, new: true },
  );
  const payload = {
    type: "message",
    message: { text: `You have entered a new asset category named ${name}` },
    by: "system",
  };
  const { messages: chats } = await saveChat({ userId: req.user.id, payload: [{ ...payload }] });
  res.status(201).json({
    status: "success",
    category,
    chats,
  });
});

exports.createExpenditureCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const newCategory = { name: req.body.name };
  const category = await ExpenditureCategory.findOneAndUpdate(
    { user: req.user.id },
    { $push: { categories: newCategory } },
    { upsert: true, new: true },
  );

  const payload = {
    type: "message",
    message: {
      text: `You have entered a new expenditure category named ${name}`,
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

exports.createIncomeCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const newCategory = { name: req.body.name };
  const category = await IncomeCategory.findOneAndUpdate(
    { user: req.user.id },
    { $push: { categories: newCategory } },
    { upsert: true, new: true },
  );

  const payload = {
    type: "message",
    message: {
      text: `You have entered a new income category named ${name}`,
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
