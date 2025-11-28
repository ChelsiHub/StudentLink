const express = require('express');
const router = express.Router();
const { getJobs, applyToJob, seedJobs } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// NOTE: You must create and export a 'createPost' function in your postController.js
// I'm assuming you have a postController file to handle social media posts.
const { createPost } = require('../controllers/postController'); 

// =========================================================================
// POST ROUTES (ADDED)
// This route handles the POST request from the client to create a new post.
// The URL will be /api/posts (since the router is mounted at '/api/posts')
// =========================================================================
router.post('/', protect, createPost); 

// =========================================================================
// EXISTING JOB ROUTES (KEPT)
// =========================================================================
router.get('/jobs', getJobs); // Note: Changed to /jobs if this file is mounted at /, otherwise keep as /
router.post('/jobs/:id/apply', protect, applyToJob);
router.post('/jobs/seed', seedJobs);


module.exports = router;