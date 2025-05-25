const cartModel= require("../../models/cartModel")
async function addToCartViewProductController(req,res) {
    try {
        const currentUser= req.userId
        const allProduct = await cartModel.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            data : allProduct,
            success : true,
            error : false
        })

    } catch (error) {
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
    
}
module.exports=addToCartViewProductController