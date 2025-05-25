const categoryModel = require("../../models/categoryModel");
async function addCategoryProductController(req, res) {
  try {
    const categoryName = req.body.name;
    const existingCategory = await categoryModel.findOne({
      name: categoryName,
    });
    if (existingCategory) {
      return res.status(400).json({
        message: "Thương hiệu đã tồn tại",
        success: false,
        error: true,
      });
    }
    const addCategory = new categoryModel(req.body);
    const saveCategory = await addCategory.save();
    res.status(201).json({
      message: "Thêm thương hiệu thành công",
      data: saveCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
module.exports = addCategoryProductController;
