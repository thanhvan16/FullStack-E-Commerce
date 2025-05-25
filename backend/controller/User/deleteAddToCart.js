const cartModel= require("../../models/cartModel")
async function deleteAddToCartController(req,res) {
    try {
        const currentUser = req.userId
        const productId= req?.body._id
        const deleteProduct = await cartModel.deleteOne({ _id :productId})
        res.json({
            message : "Xóa sản phẩm khỏi giỏ hàng",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
    
}
module.exports=deleteAddToCartController