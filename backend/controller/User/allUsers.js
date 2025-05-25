const userModel = require("../../models/userModel")

async function allUserController(req,res){
    try {
      const allUser= await userModel.find()
      res.json({
        massage:"All Users",
        data: allUser,
        success: true,
        error: false

      })
    } catch (error) {
        res.status(400).json({
            message:  error.message || error,
            error:true,
            success:false
        })
    }
}
module.exports=allUserController