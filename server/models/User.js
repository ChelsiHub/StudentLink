const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },
    
    // Profile Fields
    headline: { type: String, default: '' },
    location: { type: String, default: '' },
    about: { type: String, default: '' },
    resume: { type: String, default: '' },
    avatar: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    
    // Arrays
    skills: [
      {
        name: String,
        endorsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      },
    ],
    education: [
      {
        school: String,
        degree: String,
        year: String,
      },
    ],
    
    // --- UPDATED SOCIAL LINKS ---
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      portfolio: { type: String, default: '' },
      behance: { type: String, default: '' }, // Added Behance
      twitter: { type: String, default: '' }, // Added Twitter/X
    },
    
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);