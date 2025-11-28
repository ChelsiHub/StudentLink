const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], 
      required: true 
    },
    workMode: { 
      type: String, 
      enum: ['Remote', 'On-site', 'Hybrid'], 
      default: 'On-site' 
    },
    description: { type: String, required: true },
    requirements: [String],
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin or Recruiter
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);