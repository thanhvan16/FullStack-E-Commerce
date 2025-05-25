const productModel= require("../../models/productModel");

async function editProductController(req, res) {
    try {
        const { _id, ...resBody}=req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });
        console.log(updateProduct)
        res.json({
            message: "Cập nhật sản phẩm thành công",
            data: updateProduct,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
    
}
module.exports=editProductController