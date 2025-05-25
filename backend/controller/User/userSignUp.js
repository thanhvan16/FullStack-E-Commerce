const userModel = require("../../models/userModel")
const bcrypt = require('bcrypt');
async function userSignUpController(req,res){
    try {
        const {email, password, name}=req.body
        const user = await userModel.findOne({email})
        console.log(user)
        if(user){
            throw new Error("Tài khoản đã tồn tại")
        }
        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload={
            ...req.body,
            role:"USER",
            password: hashPassword
        }
        const userData= new userModel(payload)
        const saveUser=userData.save()
        res.status(201).json({
            data: saveUser,
            success:true,
            error: false,
            message:"Đăng kí thành công"
        })
    } catch (error) {
        res.json({
            message:  error.message || error,
            error:true,
            success:false
        })
    }
}
module.exports=userSignUpController