const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true

    },
    Email:{
       type:String,
       required:true,
       unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userResume:{
        type:String,
        required:true
    },
    jobApplications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'JobApplication'
        }
    ],
    internshipApplications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'InternshipApplication'
        }
    ]

    
})
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            // Generate a salt
            const salt = await bcrypt.genSalt(10);
            // Hash the password using the generated salt
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});

// Method to compare the provided password with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw new Error(err);
    }
};

const User=mongoose.model('User',userSchema)
module.exports=User;