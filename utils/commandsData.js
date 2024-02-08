exports.commands = {
  "/start": {
    type: "list",
    options: [
      {
        cmd: "/addAsset",
        label: "Add Asset",
        description: ".",
      },
      {
        cmd: "/addAssetCategory",
        label: "Add Asset Catgory",
        description: "Bank Account, Cash, Stocks, FD ,....",
      },
    ],
  },
  "/addAsset": {
    type: "input",
    options: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "category",
        type: "select",
        options: "assetCategoryList",
      },
      {
        name: "amount",
        type: "number",
      },
    ],
  },
};
