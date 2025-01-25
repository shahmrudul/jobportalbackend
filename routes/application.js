const express=require('express');
const InternshipApplication=require('../models/internshipapplication.js');
const User=require('../models/user.js')
const JobApplication=require('../models/jobapplication.js')
const authenticateToken=require('../middleware/authentication.js')
const apiToken=require('../middleware/apitoken.js')
const router=express.Router();
router.get('/',(req,res)=>{
    res.send('This is application routes')
})
router.get('/jobapplication',authenticateToken,async(req,res)=>{
    try{
    const user=req.query.user
    const jobapplication = await JobApplication.find({user}).populate('job', 'role')
    res.status(200).json(jobapplication)
    }catch(error){
        res.status(500).json({Error:error})
    }

})
router.get('/internshipapplication',authenticateToken,async(req,res)=>{
    try{
        const user=req.query.user
        const internshipapplication = await InternshipApplication.find({user}).populate('internship', 'role')
        res.status(200).json(internshipapplication)
        }catch(error){
            res.status(500).json({Error:error})
        }
})
router.post('/jobapplication',async(req,res)=>{
    try{
    const{companyName,user,job}=req.body;
    let jobapplicationcheck= await JobApplication.find({user:user,job:job})
    
    if(jobapplicationcheck.length!==0){
        return res.status(500).json({Error:'You have already applied for this Job'})
    }
    const jobapplication= new JobApplication({
        companyName,user,job
    })
    await jobapplication.save()
    const updateUser= await User.findByIdAndUpdate(
        user,{$push:{jobApplications:jobapplication._id}},
        {new:true}
        
    )
    if(!updateUser){
        throw new Error('User not found')
    }
    res.status(200).json({Message:'Job Application Successful'})
} catch(error){
    res.status(500).json({Error:error})
}

})
router.post('/internshipapplication',async(req,res)=>{
    try{
        const{companyName,user,internship}=req.body;
        let internshipapplicationcheck= await InternshipApplication.find({
            user:user,internship:internship
        })
        if(internshipapplicationcheck.length!==0){
            return res.status(500).json({Error:'You have already applied for this Internship'})
        }
        const internshipapplication = new InternshipApplication({
            companyName,internship,user
        })
        await internshipapplication.save();
        const updateUser= await User.findByIdAndUpdate(
            user,{$push:{internshipApplications:internshipapplication._id}},
            {new:true}
            
        )
        if(!updateUser){
            throw new Error('User not found')
        }
        res.status(200).json({Message:'Internship Application Succcessful'})

    }catch(error){
        res.status(500).json({Message:error})
    }
})


module.exports=router;