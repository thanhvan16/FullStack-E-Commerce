const categoryModel = require("../../models/categoryModel");
async function deleteCategoryController(req, res) {
  try {
    const {categoryId} = req.body;
    const deleteCategory = await categoryModel.findByIdAndDelete(categoryId);
    res.json({
      data: deleteCategory,
      message: "Xóa thương hiệu thành công",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports=deleteCategoryController