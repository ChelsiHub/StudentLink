const mongoose = require('mongoose');

const groupSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { 
      type: String, 
      default: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' // Default collaboration image
    },
    admin: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Group', groupSchema);