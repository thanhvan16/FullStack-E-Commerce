const productModel = require("../../models/productModel")
async function filterProductController(req,res){
    try {
        const category = req.query.category;
        const products = await productModel.find({ category: category });
        res.json({
            data  : products ,
            message : "Search Product list",
            error : false,
            success : true
        })

 
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
module.exports=filterProductController