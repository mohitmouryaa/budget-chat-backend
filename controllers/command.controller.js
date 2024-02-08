const catchAsync = require("../utils/catchAsync");
const { commands } = require("../utils/commandsData");
const { getAssetsCategories } = require("./categories.controller");

exports.runCommand = catchAsync(async (req, res, next) => {
  const { command } = req.body;
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
    commandList:data,
  });
});
