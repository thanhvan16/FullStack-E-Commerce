const cartModel= require("../../models/cartModel")
async function addToCartContoller(req,res) {
    try {
        const {productId, size} = req?.body
        const currentUser = req.userId
        const existingProduct = await cartModel.findOne({
            userId: currentUser            
            ,productId,size})
        if(existingProduct){
            return res.json({
                message : "Sản phẩm đã tồn tại trong giỏ hàng",
                success : false,
                error : true
            })
        }
        const payload ={
            productId: productId,
            quantity: 1,
            size: size,
            userId: currentUser
        }

        const newAddToCart = new cartModel(payload)
        const saveProduct = await newAddToCart.save()


        return res.json({
            data : saveProduct,
            message : "Thêm vào giỏ hàng thành công",
            success : true,
            error : false
        })
    } catch (error) {
        res.json({
            message:  error.message || error,
            error:true,
            success:false
        })
    }
    
}
module.exports=addToCartContoller