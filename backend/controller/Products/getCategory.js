const categoryModel = require('../../models/categoryModel')
async function getCategoryController(req,res){
    try {
        const allCategory = await categoryModel.find().sort({createdAt: -1});
        res.json({
            messange: "All category",
            success: true,
            error: false,
            data: allCategory
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error ,
            success: false,
            error: true
            
        })
    }
}
module.exports=getCategoryController