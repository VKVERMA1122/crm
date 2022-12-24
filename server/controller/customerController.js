const { updateOne, deleteOne } = require('../model/cutomer');
const Customer = require('../model/cutomer');
const User = require("../model/user");

const createNewCustomer = async(req,res)=>{
    try{
        const {name, phone, salesAgent, project, comment} = req.body;
        const user= await User.findOne({name:salesAgent});
        // console.log(user.name);
        const userName = user?.name
        
        // const alredyPhone = Customer.find({phone:phone});
        // console.log(alredyPhone)
        // if(alredyPhone){
        //     res.send(`this phone no ${phone} is alredy availiable`)
        // }else{}
        if(!userName){
            // alert("Agetn Not found !")
            return res.status(400).send("User Not Found !")
        }
        const createdCustomer = await Customer.create({
            name,
            phone,
            salesAgent,
            project,
            comment
        })
        res.send(createdCustomer);
    
    }catch(error){
        console.log(error)
    }
}
const getAllCustomer = async(req,res)=>{
    try{
        const salesAgent = req.params.salesAgent
        const customers = await Customer.find({salesAgent:salesAgent});
        res.send(customers);
    }catch(error){
        console.log(error.message);
    }
}
const updateCustomer = async (req,res)=>{
    try{
        const custId = req.params.custId;
        const {phone,salesAgent,project} = req.body
        const custUpdate = await Customer.findOneAndUpdate({lead_id:custId},{
            $set: {
                phone,
                salesAgent,
                project
            }
        })
        res.send(custUpdate)
    }catch(error){
        console.log(error.message)
    }
}
const deleteCustomer = async(req,res)=>{
    try{
        const custId = req.params.custId;
        const deleteDone= await Customer.deleteOne({custId:custId})
        res.send(deleteDone);
    }catch(error){
        console.log(error.message)
    }
}
module.exports = {
    createNewCustomer,
    getAllCustomer,
    updateCustomer ,
    deleteCustomer
    }