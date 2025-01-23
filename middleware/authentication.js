const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const JWT_secretkey=process.env.JWT_secretkey
module.exports= authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; // Get the token directly
    
    if (!token) {
        return res.status(401).json({ message: 'Token missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, JWT_secretkey);
        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};