const productModel = require("../../models/productModel")
async function getPaginatedProductController(req,res){
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const total = await productModel.countDocuments();
    const products = await productModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      data: products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      messange: "Products Pagination",
      success: true,
      error: false,
    });
    } catch (error) {
        res.status(400).json({
            message: error.message || error ,
            success: false,
            error: true
            
        })
    }
}
module.exports=getPaginatedProductController