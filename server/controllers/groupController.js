const Group = require('../models/Group');

// @desc    Get all groups
// @route   GET /api/groups
const getGroups = async (req, res) => {
  try {
    // Fetch groups and just get the count of members to keep payload light
    const groups = await Group.find()
      .populate('admin', 'name') // Get admin name
      .sort({ createdAt: -1 });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new group
// @route   POST /api/groups
const createGroup = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Please provide name and description' });
    }

    const group = await Group.create({
      name,
      description,
      image: image || undefined, // Use default from model if empty
      admin: req.user._id,
      members: [req.user._id] // Admin is automatically the first member
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Join a group
// @route   PUT /api/groups/:id/join
const joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if already a member
    if (group.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'You are already a member' });
    }

    group.members.push(req.user._id);
    await group.save();

    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGroups, createGroup, joinGroup };