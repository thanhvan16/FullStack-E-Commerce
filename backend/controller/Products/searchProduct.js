const productModel = require("../../models/productModel")
async function seachProductController(req,res) {
    try {
        const query = req.query.q
        const regex= new RegExp(query,'i','g')
        const product = await productModel.find(
            {
                "$or" : [
                {
                    title : regex
                },
                {
                    category : regex
                }
            ]
            }
        )
        res.json({
            data  : product ,
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
module.exports= seachProductController