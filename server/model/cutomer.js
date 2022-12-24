const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const today = new Date();
const date = today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear();
const time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
const Customer = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        require:true,
        unique:true
    },
    salesAgent:{
        type:String
    },
    project:{
        type:String
    },
    comment:{
        type:String,
    },
    dispositionCount:{
        type:Number
    },
    createdDate:{
        type:String,
        default:time+' '+date

    }
})

Customer.plugin(AutoIncrement,{
    inc_field:"lead_id",
    start_seq:1000
})



module.exports = mongoose.model('customer', Customer);