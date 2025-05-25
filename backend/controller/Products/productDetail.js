const productModel = require('../../models/productModel')
async function productDetailController(req,res){
    try {
        const productId = req.body.id
        const product = await productModel.findById(productId)
        res.status(200).json({
            data: product,
            error: false,
            success: true,
            message:"Product details"


        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
module.exports= productDetailController