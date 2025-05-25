const productModel= require("../../models/productModel")
async function deleteProductController(req, res) {
    try {
        const {productId}= req.body
        const deleteProduct=await productModel.findByIdAndDelete(productId)
        res.json({
            data: deleteProduct,
            message: "Xóa sản phẩm thành công",
            success: true,
            error: false,
          });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
    
}
module.exports=deleteProductController