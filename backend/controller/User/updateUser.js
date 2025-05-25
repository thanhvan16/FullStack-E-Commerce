const userModel = require("../../models/userModel");

async function updateUserController(req,res){
    try {
        const {userId, role}=req.body;
        const payload={
            ...(role&&{role})
        }
        const updateUser= await userModel.findByIdAndUpdate(userId,payload,{new:true})
        res.json({
            data:updateUser,
            message: "Cập nhật vai trò người dùng thành công",
            success: true,
            error: false,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}
module.exports=updateUserController