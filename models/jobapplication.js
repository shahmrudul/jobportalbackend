
const mongoose=require('mongoose');

const jobapplicationSchema = new mongoose.Schema(
    {
      companyName:{
        type:String,
        
        required:true


      } ,
      user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User',
         required:true
      }
        ,
     job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true

     },
     status:{
       type:String,
       enum:['pending','accepted','rejected'],
       default:'pending'
     }
     ,
    







    }
)
const JobApplication=mongoose.model('JobApplication',jobapplicationSchema)
module.exports=JobApplication;