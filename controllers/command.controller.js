const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const { commands } = require("../utils/commandsData");
const { getAssetsCategories } = require("./categories.controller");

exports.runCommand = catchAsync(async (req, res, next) => {
  const { command } = req.body;

  const response = await axios.post(`${process.env.URL}/api/v1/chats`, {
    userId: "65c1d927921def8a69892609",
    messages: [
      {
        type: "command",
        message: {
          text: command,
          date: Date.now(),
        },
        by: "user",
      },
    ],
  });

  let data = [];
  if (commands[command]?.type === "list") {
    data = [...commands[command].options];
  } else if (commands[command]?.type === "input") {
    data = await Promise.all(
      commands[command].options.map(async (cmd) => {
        if (cmd.type === "select") {
          switch (cmd.options) {
            case "assetCategoryList":
              cmd.options = await getAssetsCategories();
              break;
            default:
              break;
          }
        }
        return cmd;
      }),
    );
  }
  res.status(200).json({
    status: "success",
    command,
    type: commands[command]?.type,
    commandList: data,
    ...(response && { chat: response.data.chat }),
  });
});
