const mongoose=require('mongoose');
const jobSchema= new mongoose.Schema({
   
              companyName:{
                type:String,
                required:true
              },
       location:{
        type:String,
        required:true

       },
       experience: {
        type: {
          min: { type: Number, required: true, min: 0 },
          max: { type: Number, required: true, min: 1 },
        },required:true},
        role:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
       
        salary:{
          type:String,
          required:true
        },
        description:{
            type:String,
            required:true
        }
})
const Job= mongoose.model('Job',jobSchema)
module.exports=Job
