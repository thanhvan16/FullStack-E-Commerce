const userModel = require("../models/userModel")

const addProductPermission= async(userId)=>{
    const user = await userModel.findById(userId)
    if(user.role==="ADMIN"){
        return true
    }

   return true
}
module.exports= addProductPermission