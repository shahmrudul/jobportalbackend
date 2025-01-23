const mongoose=require('mongoose')
const recruiterSchema= new mongoose.Schema({
    CompanyName:{
        type:String,
        required:true,
        unique:true
    },
    Location:{
        type:String,
        required:true
    }
})
const Recruiter=mongoose.model('Recruiter',recruiterSchema)
module.exports=Recruiter