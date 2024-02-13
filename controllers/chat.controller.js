const Chat = require("../models/chat.model");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");
const mongoose = require("mongoose");

exports.createChat = catchAsync(async (req, res, next) => {
  const newChat = await Chat.create(req.body);
  res.status(201).json({
    status: "success",
    chat: newChat,
  });
});

exports.updateChat = catchAsync(async (req, res, next) => {
  const filter = { userId: "65c1d927921def8a69892609" };
  const update = { $unshift: { messages: req.body.message } };

  const updatedChat = await Chat.findOneAndUpdate(filter, update, {
    new: true,
    runValidators: true, // Run validators on update
  });

  res.status(200).json({
    status: "success",
    chat: updatedChat,
  });
});

exports.getUserChat = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1;
  const pipeline = [
    {
      $match: { userId: { $eq: new mongoose.Types.ObjectId("65c1d927921def8a69892609") } }, // Filter by userId
    },
    {
      $project: {
        _id: 1,
        messages: {
          $slice: ["$messages", (page - 1) * limit, limit], // Paginate messages
        },
      },
    },
    {
      $group: {
        _id: 1, // Can group by a field if needed
        messages: { $push: "$messages" }, // Collect all messages into an array
      },
    },
    {
      $unwind: "$messages", // Unwind the messages array
    },
    {
      $project: {
        _id: 1,
        messages: "$messages",
        totalPages: { $ceil: { $divide: [{ $size: "$messages" }, limit] } }, // Calculate totalPages manually
      },
    },
  ];

  const [chat] = await Chat.aggregate(pipeline);
  res.status(200).json({
    status: "success",
    chats: {
      ...chat,
      messages: chat.messages,
      currentPage: page,
    },
  });
});
