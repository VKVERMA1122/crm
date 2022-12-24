const Desposition = require('../model/desposition');
const Customer = require('../model/cutomer')
const addDespositon = async(req,res)=>{
    try{
        const leadId = req.params.lead_id;
        const {userId,desposition,comment}= req.body
        const despositionAdd = await Desposition.create({
            userId,
            desposition,
            comment,
            lead_id:leadId
        })
        const countOfDisposition = await Desposition.find({lead_id:leadId})
        const totalDisposition = countOfDisposition.length;
        console.log(totalDisposition)
        const customerCountUpdate = await Customer.updateOne({lead_id:leadId},{dispositionCount:totalDisposition})
        console.log(customerCountUpdate)
        res.send(despositionAdd)
    }catch(error){
        console.log(error.message)
    }
}

const getAllDesposition = async(req,res)=>{
    try {
        const custId = req.params.lead_id;
        const getDespositin= await Desposition.find({lead_id:custId});
        res.send(getDespositin);
    } catch (error) {
        console.log(error.message)
    }
}

// const deleteDesposition = async(req,res)=>{
//     try{
        
//     }catch(error){

//     }
// }
module.exports = {
    addDespositon,
    getAllDesposition
    };