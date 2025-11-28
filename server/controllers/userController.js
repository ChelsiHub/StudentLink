const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.headline = req.body.headline || user.headline;
      user.location = req.body.location || user.location;
      user.about = req.body.about || user.about;
      user.resume = req.body.resume || user.resume;
      if (req.body.avatar) user.avatar = req.body.avatar;
      if (req.body.coverImage) user.coverImage = req.body.coverImage;
      if (req.body.education) user.education = req.body.education;
      if (req.body.socialLinks) {
        user.socialLinks = { ...user.socialLinks, ...req.body.socialLinks };
      }

      // --- SMART SKILLS UPDATE (Preserve Endorsements) ---
      if (req.body.skills) {
        const newSkillNames = req.body.skills; // Array of strings ["React", "Java"]
        const existingSkills = user.skills; // Array of Objects [{name: "React", endorsers: [...]}]

        // 1. Keep existing skills that are in the new list (to keep endorsers)
        const keptSkills = existingSkills.filter(s => newSkillNames.includes(s.name));
        
        // 2. Identify pure new skills
        const existingNames = keptSkills.map(s => s.name);
        const pureNewSkills = newSkillNames
          .filter(name => !existingNames.includes(name))
          .map(name => ({ name, endorsers: [] }));

        // 3. Merge
        user.skills = [...keptSkills, ...pureNewSkills];
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        headline: updatedUser.headline,
        location: updatedUser.location,
        avatar: updatedUser.avatar,
        coverImage: updatedUser.coverImage,
        socialLinks: updatedUser.socialLinks,
        skills: updatedUser.skills, // Return skills
        token: req.headers.authorization.split(' ')[1]
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user profile by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Endorse a skill
// @route   PUT /api/users/:id/endorse
// @access  Private
const endorseUserSkill = async (req, res) => {
  try {
    // 1. Find the profile owner (by ID in URL)
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Find the specific skill inside the user's skills array
    const skill = user.skills.id(req.body.skillId);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // 3. Check if the logged-in user (req.user._id) has already endorsed
    const endorserIndex = skill.endorsers.indexOf(req.user._id);

    if (endorserIndex === -1) {
      // Not endorsed yet -> Add endorsement
      skill.endorsers.push(req.user._id);
    } else {
      // Already endorsed -> Remove endorsement (Toggle off)
      skill.endorsers.splice(endorserIndex, 1);
    }

    await user.save();
    
    // Return the updated user to refresh UI
    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { updateUserProfile, getUserById, endorseUserSkill };