const express=require('express');
const router=express.Router();
const Recruiter=require('../models/recruiter')
const Internship=require('../models/internship')
router.get('/',async(req,res)=>{
    try{
    const data={...req.query}
    
    let queryString=JSON.stringify(data)
    queryString=queryString.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
    
    const internship= await Internship.find(JSON.parse(queryString))
    
    
    res.json(internship)
    }catch(error){
        res.status(500).send(error)
    }
})
router.get('/categories',async(req,res)=>{
    let categories=[]
    const uniqueCategories = await Internship.aggregate([
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