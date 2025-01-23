const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    skills: [String],
    experience: [
        {
            jobTitle: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
    ],
    education: [
        {
            degree: String,
            institution: String,
            startDate: Date,
            endDate: Date,
        },
    ],
    certifications: [String],
    projects: [
        {
            title: String,
            description: String,
            link: String,
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
