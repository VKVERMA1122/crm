const mongoose = require('mongoose');
const today= new Date()
const date = today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear();
const time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();

const Desposition = new mongoose.Schema({
    userId:{
        type:Number,
        required:true        
    },
    desposition:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    despositionAt:{
        type:String,
        default:time+' '+date
    },
    lead_id:{
        type:Number,
        required:true        
    }
})

module.exports = mongoose.model("Despositions",Desposition);