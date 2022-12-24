const mongoose = require('mongoose');

const dotenv = require('dotenv').config({path:'./config.evn'})

const connectDB= async ()=>{
    const connected = await mongoose.connect(process.env.DATABASE_URL)
    if (connected){
        console.log('mongo connected')
    }
}
module.exports = {connectDB};