const orderModel = require("../../models/orderModel");

async function updateOrderController(req, res) {
  const { orderId, status } = req.body;
  try {
    let updateData = { status };

    if (status === "Delivered") {
      updateData.payment = true;
    }

    const orderUpdate = await orderModel.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );
    res.json({
      success: true,
      message:"Cập nhật trạng thái đơn hàng thành công",
      data: orderUpdate,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || error,
    });
  }
}
module.exports = updateOrderController;
