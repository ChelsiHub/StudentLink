import React, { useState } from 'react';
import { 
  Paper, Box, Typography, Chip, IconButton, Dialog, 
  DialogTitle, DialogContent, DialogActions, TextField, Button, Badge 
} from '@mui/material';
import { Add, Check, ThumbUpAlt } from '@mui/icons-material';
import axios from 'axios';

const SkillsSection = ({ user, isOwnProfile, onProfileUpdate }) => {
  const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  // Get current user ID to check if *I* have endorsed this skill
  const currentUser = JSON.parse(localStorage.getItem('userInfo'));

  // Handle Adding a New Skill
  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    const currentSkillNames = user.skills.map(s => s.name);
    // Create new array of strings
    const updatedSkillsList = [...currentSkillNames, newSkill];

    const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
    
    try {
      const { data } = await axios.put('/api/users/profile', { skills: updatedSkillsList }, config);
      onProfileUpdate(data);
      setNewSkill('');
      setOpen(false);
    } catch (error) {
      console.error("Failed to add skill", error);
    }
  };

  // Handle Endorsing (Visitor Only)
  const handleEndorse = async (skillId) => {
    if (isOwnProfile) return; // Can't endorse yourself

    const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
    try {
      // PUT /api/users/:id/endorse
      const { data } = await axios.put(`/api/users/${user._id}/endorse`, { skillId }, config);
      onProfileUpdate(data); // Update with new endorsement count
    } catch (error) {
      console.error("Failed to endorse", error);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Skills & Endorsements</Typography>
        {isOwnProfile && (
          <IconButton onClick={() => setOpen(true)} color="primary">
            <Add />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        {user?.skills?.map((skill) => {
          // Check if the current viewer has endorsed this skill
          const isEndorsedByMe = skill.endorsers.includes(currentUser?._id);
          
          return (
            <Badge 
              key={skill._id} 
              badgeContent={skill.endorsers.length} 
              color="primary"
              invisible={skill.endorsers.length === 0}
              sx={{ '& .MuiBadge-badge': { right: -3, top: 3 } }}
            >
              <Chip
                label={skill.name}
                onClick={() => handleEndorse(skill._id)}
                icon={isEndorsedByMe ? <Check /> : (isOwnProfile ? null : <ThumbUpAlt fontSize="small"/>)}
                sx={{ 
                  fontSize: '0.95rem',
                  py: 2.5,
                  px: 1,
                  cursor: isOwnProfile ? 'default' : 'pointer',
                  bgcolor: isEndorsedByMe ? 'primary.light' : 'default',
                  color: isEndorsedByMe ? 'white' : 'default',
                  border: isEndorsedByMe ? 'none' : '1px solid #e0e0e0',
                  '&:hover': {
                    bgcolor: !isOwnProfile ? (isEndorsedByMe ? 'primary.main' : '#f5f5f5') : 'default'
                  }
                }}
              />
            </Badge>
          );
        })}
        
        {(!user?.skills || user.skills.length === 0) && (
          <Typography variant="body2" color="text.secondary">
            No skills added yet.
          </Typography>
        )}
      </Box>

      {/* --- ADD SKILL MODAL --- */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add Skill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Skill Name"
            fullWidth
            variant="outlined"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g. React, Leadership"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSkill} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SkillsSection;