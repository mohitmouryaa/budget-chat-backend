const catchAsync = require("../utils/catchAsync");
const { commands } = require("../utils/commandsData");
const { getAssetsCategories, getExpenditureCategories } = require("./categories.controller");
const { saveChat } = require("./chat.controller");

exports.runCommand = catchAsync(async (req, res, next) => {
  const { command, type } = req.body;
  const payload = [
    {
      type: type,
      message: {
        text: command,
      },
      by: "user",
    },
  ];
  let data = [];
  if (commands[command]?.type === "list") {
    data = [...commands[command].options];
  } else if (commands[command]?.type === "input") {
    data = await Promise.all(
      commands[command].options.map(async (cmd) => {
        if (cmd.type === "select") {
          switch (cmd.options) {
            case "assetCategoryList":
              cmd.options = await getAssetsCategories(req.user);
              break;
            case "expenditureCategoryList":
              cmd.options = await getExpenditureCategories(req.user);
              break;
            default:
              break;
          }
        }
        return cmd;
      }),
    );
  }
  if (data?.length > 0) {
    payload.unshift({
      type: commands[command]?.type,
      message: {
        text: data,
      },
      by: "system",
    });
  }
  const response = await saveChat({ userId: req.user.id, payload });

  res.status(200).json({
    status: "success",
    command,
    type: commands[command]?.type || "message",
    ...(data?.length && { commandList: data }),
    ...(response && { chat: response.messages }),
  });
});
