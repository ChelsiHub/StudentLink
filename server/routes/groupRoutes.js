const express = require('express');
const router = express.Router();
const { getGroups, createGroup, joinGroup } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getGroups)
  .post(protect, createGroup);

router.put('/:id/join', protect, joinGroup);

module.exports = router;