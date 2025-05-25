const mongoose = require('mongoose')
const categorySchema= new mongoose.Schema({
    name: String

},
    {
        timestamps:true
    })
    const categoryModel= mongoose.model("category", categorySchema, 'category')
module.exports=categoryModel