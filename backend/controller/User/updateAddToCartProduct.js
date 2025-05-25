const cartModel= require("../../models/cartModel")

const updateAddToCartProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        // const updateProduct = await cartModel.updateOne({_id : addToCartProductId},{
        //     ...(qty && {quantity : qty})
        // })

        const updateProduct = await cartModel.findByIdAndUpdate(
            addToCartProductId,
            { ...(qty && { quantity: qty }) },
            { new: true } // <-- trả về document sau khi cập nhật
        );
        console.log("udP",updateProduct)

        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateAddToCartProduct