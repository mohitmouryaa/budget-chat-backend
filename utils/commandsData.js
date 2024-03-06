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
        label: "Add Asset Category",
        description: "Bank Account, Cash, Stocks, FD ,....",
      },
      {
        cmd: "/addExpenditure",
        label: "Add Expenditure",
        description: ".",
      },
      {
        cmd: "/addExpenditureCategory",
        label: "Add Expenditure Category",
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
  "/addAssetCategory": {
    type: "input",
    options: [
      {
        name: "name",
        type: "text",
      },
    ],
  },
  "/addExpenditure": {
    type: "input",
    options: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "category",
        type: "select",
        options: "expenditureCategoryList",
      },
      {
        name: "amount",
        type: "number",
      },
    ],
  },
  "/addExpenditureCategory": {
    type: "input",
    options: [
      {
        name: "name",
        type: "text",
      },
    ],
  },
};
