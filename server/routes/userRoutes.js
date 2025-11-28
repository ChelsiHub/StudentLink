const express = require('express');
const router = express.Router();
const { updateUserProfile, getUserById, endorseUserSkill } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.put('/profile', protect, updateUserProfile);
router.get('/:id', protect, getUserById);

// New Endorsement Route
// :id is the User ID of the profile we are viewing
router.put('/:id/endorse', protect, endorseUserSkill);

module.exports = router;