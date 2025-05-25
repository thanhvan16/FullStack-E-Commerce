const mongoose= require("mongoose")
const cartSchema= mongoose.Schema({
    productId : {
        ref : 'product',
        type : String,
   },
    quantity: Number,
    size: String,
    userId: String,
},
   {
    timestamps: true
   })
const cartModel= mongoose.model("cart", cartSchema, 'cart')
module.exports=cartModel