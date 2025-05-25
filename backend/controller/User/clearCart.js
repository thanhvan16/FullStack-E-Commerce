const cartModel = require("../../models/cartModel")

async function clearCartController(req,res){
    try {
        await cartModel.deleteMany({userId: req.userId})
        res.json(
            {
            success: true, 
            message: 'Giỏ hàng đã được xóa'
            }
        )
    } catch (error) {
            res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports=clearCartController