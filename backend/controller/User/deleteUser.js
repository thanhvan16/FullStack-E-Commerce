const userModel = require("../../models/userModel");

async function deleteUserController(req, res) {
  try {
    const {userId}=req.body
    const deleteUser= await userModel.findByIdAndDelete(userId)
    res.json({
      data: deleteUser,
      message: "Xóa người dùng thành công",
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
module.exports = deleteUserController;
