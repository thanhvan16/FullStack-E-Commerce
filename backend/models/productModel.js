const mongoose = require('mongoose')

const productSchema= new mongoose.Schema({
    title: String,
    price: Number,
    discount: Number,
    description: String,
    category: String,
    size: [],
    image: String
    
},{
    timestamps:true
})
 const productModel= mongoose.model("product", productSchema,'products')

 module.exports=productModel