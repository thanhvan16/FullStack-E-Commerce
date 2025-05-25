const orderModel = require("../../models/orderModel")

async function allOrderController(req,res){
    try {
        const allOrders = await orderModel.find({}).sort({ createdAt: -1 });
        console.log(allOrders)
        res.json({
            success:true,
            data: allOrders
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || error
        })
    }
}
module.exports=allOrderController