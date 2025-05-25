const productModel=require("../../models/productModel")
async function getProductController(req,res){
    try {
        const allProduct = await productModel.find().sort({createdAt: -1});
        res.json({
            messange: "All products",
            success: true,
            error: false,
            data: allProduct
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error ,
            success: false,
            error: true
            
        })
    }
}
module.exports=getProductController