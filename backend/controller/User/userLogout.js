async function userLogoutController(req,res){
    try {
        res.clearCookie("token")


        res.json({
            message: "Đăng xuất thành công",
            error:false,
            success: true,
            data: []
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })       
    }
}
module.exports= userLogoutController