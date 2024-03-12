const Transaction = require("../models/transaction.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { saveChat } = require("./chat.controller");

exports.createTransaction = catchAsync(async (req, res, next) => {
  if (!req.body?.category) {
    next(new AppError("Please provide category Id!", 400));
  }

  const { type: transactionType } = req.body;

  const transaction = await Transaction.create({
    type: transactionType,
    user: req.user.id,
    ...(transactionType === "Expense" && { expenditure: req.body?.category }),
    ...(transactionType === "Income" && { income: req.body?.category }),
    asset: req.body?.asset,
    amount: req.body?.amount,
    note: req.body?.note,
  });

  const payload = {
    type: "message",
    message: { text: `You have done a transaction` },
    by: "system",
  };
  const { messages: chats } = await saveChat({ userId: req.user.id, payload: [{ ...payload }] });

  res.status(201).json({
    status: "success",
    transaction,
    chats,
  });
});
