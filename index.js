const express= require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const dotenv=require('dotenv')
const Recruiter=require('./models/recruiter.js');
const User=require('./models/user.js')
dotenv.config()
mongoose.connect(process.env.MONGODB_URI,
    
).then(() => {
    console.log('Connected to MongoDB');
})
const app=express();
app.use(cors())
app.use(express.json())
const port=3000;

app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.use('/api/users',require('./routes/user.js'))
app.use('/api/jobposting',require('./routes/jobposting.js'))
app.use('/api/jobapplications',require('./routes/application.js'))
app.use('/api/jobs',require('./routes/jobs.js'))
app.use('/api/internships',require('./routes/internships.js'))
app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})