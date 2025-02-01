const express=require('express');
const User=require('../models/user.js');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()
const router=express.Router()
let JWT_secretkey=process.env.JWT_secretkey;
const authenticateToken=require('../middleware/authentication.js')

router.get('/',(req,res)=>{
    res.send('This is user route')
})
router.post('/signup',async(req,res)=>{
    try{
     const {username,password,Name,Email,userResume}=req.body;
     const user= new User({username,password,Name,Email,userResume})
     await user.save();
     res.status(200).json({username:user.username,email:user.Email})
     
    }
    catch(error){
      res.status(500).json({
        Error:"Use unique emailid or username"
      })
    }
})
router.post('/login',async(req,res)=>{
    try{
        const{username,password}=req.body
    
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(500).json({Error:'Authentication failed. User not found.'});
        }

        const isMatch = await user.comparePassword(password);
        
        
        if (isMatch) {
            let token= jwt.sign({username},JWT_secretkey,{expiresIn:'7d'});
            
             return res.json({username:user.username,
                loggedin:true,
                jwttoken:token,
                Id:user._id,
                Name:user.Name,
                Email:user.Email,

            });
        } else {
            res.status(404).json({Error:'Authentication failed. Incorrect password.'});
        }

    }catch(err){
        res.send('Error during authentication',err);
    }

   
})
module.exports=router