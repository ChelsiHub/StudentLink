import React, { useState } from 'react';
import { 
  Paper, Box, Typography, IconButton, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, Button, Stack, Divider 
} from '@mui/material';
import { Add, School, Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

const EducationSection = ({ user, isOwnProfile, onProfileUpdate }) => {
  const [open, setOpen] = useState(false);
  const [newEdu, setNewEdu] = useState({ school: '', degree: '', year: '' });

  const currentUser = JSON.parse(localStorage.getItem('userInfo'));

  const handleAddEducation = async () => {
    if (!newEdu.school || !newEdu.degree) return;

    // Create new list: Existing education + New Entry
    const currentEducation = user.education || [];
    const updatedEducation = [...currentEducation, newEdu];

    const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
    
    try {
      const { data } = await axios.put('/api/users/profile', { education: updatedEducation }, config);
      onProfileUpdate(data);
      setNewEdu({ school: '', degree: '', year: '' });
      setOpen(false);
    } catch (error) {
      console.error("Failed to add education", error);
    }
  };

  const handleDelete = async (indexToDelete) => {
    if (!window.confirm("Delete this education entry?")) return;

    const updatedEducation = user.education.filter((_, index) => index !== indexToDelete);
    const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };

    try {
      const { data } = await axios.put('/api/users/profile', { education: updatedEducation }, config);
      onProfileUpdate(data);
    } catch (error) {
      console.error("Failed to delete education", error);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">Education</Typography>
        {isOwnProfile && (
          <IconButton onClick={() => setOpen(true)} color="primary">
            <Add />
          </IconButton>
        )}
      </Box>

      <Box>
        {user?.education?.map((edu, index) => (
          <Box key={index} sx={{ position: 'relative', pl: 2, pb: 3 }}>
            {/* Vertical Line Logic */}
            {index !== user.education.length - 1 && (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  left: '28px', 
                  top: '40px', 
                  bottom: 0, 
                  width: '2px', 
                  bgcolor: 'grey.300' 
                }} 
              />
            )}

            <Stack direction="row" spacing={2} alignItems="flex-start">
              {/* Icon Bubble */}
              <Box 
                sx={{ 
                  bgcolor: 'grey.100', 
                  p: 1, 
                  borderRadius: 2,
                  zIndex: 1, // Sit on top of the line
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <School sx={{ color: 'text.secondary' }} />
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {edu.school}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.degree}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {edu.year}
                </Typography>
              </Box>

              {/* Delete Action (Owner Only) */}
              {isOwnProfile && (
                <IconButton size="small" onClick={() => handleDelete(index)}>
                  <Delete fontSize="small" color="disabled" />
                </IconButton>
              )}
            </Stack>
          </Box>
        ))}

        {(!user?.education || user.education.length === 0) && (
          <Typography variant="body2" color="text.secondary" align="center">
            No education history added yet.
          </Typography>
        )}
      </Box>

      {/* --- ADD MODAL --- */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Education</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField 
              label="School / University" 
              fullWidth 
              value={newEdu.school}
              onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
            />
            <TextField 
              label="Degree" 
              fullWidth 
              value={newEdu.degree}
              onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
            />
            <TextField 
              label="Year (Start - End)" 
              fullWidth 
              placeholder="e.g. 2019 - 2023"
              value={newEdu.year}
              onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddEducation}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default EducationSection;