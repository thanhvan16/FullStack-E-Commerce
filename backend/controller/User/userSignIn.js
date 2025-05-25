const userModel = require("../../models/userModel")
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

async function userSignInController(req,res){
    try {
        const {email,password}= req.body
        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }

        const user= await userModel.findOne({email})
        if(!user){
            throw new Error("User not found")
        }
        const checkPassword= await bcrypt.compare(password,user.password)
        if(checkPassword){
           const tokenData={
                   _id: user._id,
                   email: user.email,
                   role: user.role
           }
        //    Lưu tokenData lên trên cookies 
           const token= await  jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 });
           const tokenOption={
            httpOnly: true,
            secure: true
           }
           res.cookie("token", token, tokenOption).status(200).json({
            message:"Đăng nhập thành công",
            data: token,
            success: true,
            error: false

           })   
        }
        else{
            throw new Error("Vui lòng kiểm tra lại mật khẩu")
        }


    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
module.exports = userSignInController