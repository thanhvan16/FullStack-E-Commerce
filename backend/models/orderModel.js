const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    orderItems:{
        type: Array,
        require: true
    },
    userId:{
        type: String,
        require: true
    },
    address:{
        type: Object,
        require:true
    },
    status:{
        type: String,
        default: "Pending"
    },
    date:{
        type: Date,
        default: Date.now(),
    },
    payment:{
        type: Boolean,
        default: false
    },
    amount:{
        type: Number,
        require:true
    },
},{
    timestamps:true
})

const orderModel = mongoose.model("order", orderSchema,'order')
module.exports=orderModel