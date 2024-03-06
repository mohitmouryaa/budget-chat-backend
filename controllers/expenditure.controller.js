const Expenditure = require("../models/expenditure.model");
const catchAsync = require("../utils/catchAsync");
const { saveChat } = require("./chat.controller");

exports.createExpenditure = catchAsync(async (req, res, next) => {
  const { name, amount: balance, category } = req.body;
  const doc = await Expenditure.create({
    name,
    balance,
    category,
    userId: req.user.id,
  });
  const expenditure = await doc.populate("category");
  const text = `You have entered a new expenditure named ${name} with the balance of ${balance} in the category of ${expenditure.category.name}`;
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
    message: "Expenditure added successfully",
    expenditure,
    chats: chats.messages,
  });
});
