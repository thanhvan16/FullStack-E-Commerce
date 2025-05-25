const orderModel = require("../../models/orderModel")

async function userOrderController(req,res){
    try {
        const orders = await orderModel.find({userId:req.body.userId}).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || error
        })
    }
}
module.exports=userOrderController