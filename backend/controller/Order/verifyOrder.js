const orderModel = require("../../models/orderModel");

async function verifyOrderController(req,res){
    const {orderId, success} = req.body;
    try {
        const orderDetail = await orderModel.findById(orderId)
        if(orderDetail?.address.payment_method=='bank-transfer'){
            if(success=='true'){
                await orderModel.findByIdAndUpdate(orderId,{payment:true})
                res.json({
                    success: true,
                    message:"Paid"
                })
            }
            else{
                await orderModel.findByIdAndDelete(orderId)
                res.json({
                    success: false,
                    message:" Not Paid"
                })
            }
        }
        else{
               res.json({
                    success: true,
                    message:" Not Paid"
                })
        }
        
    } catch (error) {
            res.json({
                success: false,
                message: error.message || error
            })
    }
}
module.exports=verifyOrderController