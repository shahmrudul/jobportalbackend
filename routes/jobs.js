const express=require('express');
const mongoose=require('mongoose');
const Jobs=require('../models/job');
const Recruiter=require('../models/recruiter')
const router=express.Router();
router.get('/',async(req,res)=>{
    const data={...req.query}
    
    let queryString=JSON.stringify(data)
    queryString=queryString.replace(/\b(gte|lte|gt|lt)\b/g,match=>`$${match}`)
    
    const job= await Jobs.find(JSON.parse(queryString));
    
        

    
    res.json(job)
})
router.get('/categories',async(req,res)=>{
    let categories=[]
    const uniqueCategories = await Jobs.aggregate([
        {
          $group: {
            _id: "$category", // Group by the category field
          },
        },
        
        {
          $project: {
            _id: 0,
            category: "$_id", // Rename _id to category
          },
          
        },
        
      ]);
      uniqueCategories.forEach((category)=>categories.push(category['category']))
      res.json(categories)
      
})
module.exports=router