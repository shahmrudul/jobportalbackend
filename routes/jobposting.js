const express=require('express');
const Job=require('../models/job');
const Internship=require('../models/internship')
const apiToken=require('../middleware/apitoken.js')
const router=express.Router()
router.get('/',apiToken,(req,res)=>{
    res.send('this is a job posting route')
})
router.post('/manyjobs',apiToken,async(req,res)=>{
  try{
    const{arrayData}=req.body;
    
    let parseData=arrayData.map((data)=>JSON.parse(data))
    const jobs = await Job.insertMany(parseData);
    res.json({message:'Done'})

  }catch(error){
    console.log(error)
    res.status(500).json({Error:error})
  }
})
router.post('/manyinternships',apiToken,async(req,res)=>{
  try{
    const{arrayData}=req.body;
    
    let parseData=arrayData.map((data)=>JSON.parse(data))
    const jobs = await Internship.insertMany(parseData);
    res.json({message:'Done'})

  }catch(error){
    console.log(error)
    res.status(500).json({Error:error})
  }
})
router.post('/jobs',async(req,res)=>{
    try{
    const{recruiter,role,category,experience,salary,description,location,companyName}=req.body
    const job= new Job({
        recruiter,role,category,experience,salary,description,experience,companyName,location
    })
     await job.save()
     res.json(job)
    } 
    catch(error){
      res.status(500).send(error)
    }

})
router.post('/internships',async(req,res)=>{
    try{
      const{recruiter,role,category,duration,stipend,description,location,companyName}=req.body
      const internship= new Internship({
        recruiter,role,category,duration,stipend,description,companyName,location
      })
      await internship.save()
      res.json(internship)
    }catch(error){
       res.status(500).send(error)
    }
})


module.exports=router