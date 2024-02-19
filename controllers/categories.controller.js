const AssetCategory = require("../models/assetsCategories.model");
const catchAsync = require("./../utils/catchAsync");

exports.createAssetCategories = catchAsync(async (req, res, next) => {
  const newCatergory = await AssetCategory.create(req.body);
  res.status(201).json({
    status: "success",
    category: newCatergory,
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
