const mongoose=require('mongoose')
const internshipSchema= new mongoose.Schema({
   
   companyName:{
     type:String,
     required:true
   },
    location:{
      type:String,
      required:true
    },
    role:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    stipend:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const Internship=mongoose.model('Internship',internshipSchema)
module.exports=Internship