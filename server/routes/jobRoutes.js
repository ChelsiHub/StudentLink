const express = require('express');
const router = express.Router();
const { getJobs, applyToJob, seedJobs } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.post('/:id/apply', protect, applyToJob);
router.post('/seed', seedJobs); // Run this once via Postman to populate DB

module.exports = router;