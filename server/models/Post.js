const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // New Fields for post type and content variety
    postType: { 
      type: String, 
      enum: ['text', 'photo', 'video', 'event', 'article'], 
      default: 'text' 
    },
    content: { type: String, required: true },
    mediaUrl: { type: String }, // For 'photo' or 'video'
    linkUrl: { type: String },  // For 'event' or 'article'
    
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
      {
        text: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);