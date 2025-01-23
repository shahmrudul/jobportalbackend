const dotenv=require('dotenv')
dotenv.config()
const API_KEY=process.env.API_KEY;
module.exports= apiToken = (req, res, next) => {
    
    const apiToken = req.headers['apitoken']; // Get the token directly
    
    if (!apiToken) {
        return res.status(401).json({ message: 'Token missing or invalid' });
    }

    try {
       if(apiToken===API_KEY){
        next()
       }else{
        return res.status(401).json({message:'Wrong token'})
       }
    } catch (err) {
        return res.status(403).json({ message: 'Invalid  token' });
    }
};
