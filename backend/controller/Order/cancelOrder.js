const orderModal= require("../../models/orderModel")
async function cancelOrderController(req,res) {
    try {
        const {orderId}= req.body;
        const orderCancel= await orderModal.findByIdAndDelete(orderId);
         res.json({
            data: orderCancel,
            message: "Hủy đơn hàng thành công",
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
module.exports= cancelOrderController