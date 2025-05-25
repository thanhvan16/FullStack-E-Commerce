const productModel= require("../../models/productModel")
async function addProductController(req,res){
    try {
        const addProduct = new productModel(req.body)
        const saveProduct= await addProduct.save()
        res.status(201).json({
            message:"Thêm sản phẩm thành công",
            data: saveProduct,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error ,
            success: false,
            error: true
            
        })
        
    }
}
module.exports=addProductController