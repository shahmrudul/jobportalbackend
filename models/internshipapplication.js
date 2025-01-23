const mongoose=require('mongoose');
const internshipapplicationSchema = new mongoose.Schema(
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
     internship:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Internship',
        required:true

     },
     status:{
       type:String,
       enum:['pending','accepted','rejected'],
       default:'pending'
     },
    









    }
)
const InternshipApplication=mongoose.model('InternshipApplication',internshipapplicationSchema)
module.exports=InternshipApplication