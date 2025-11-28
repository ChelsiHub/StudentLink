import React, { useState } from 'react';
import { 
  Paper, Box, Avatar, Typography, Button, IconButton, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack 
} from '@mui/material';
import { Edit, CameraAlt, LocationOn } from '@mui/icons-material';
import axios from 'axios';

const ProfileHeader = ({ user, isOwnProfile, onProfileUpdate }) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    headline: user?.headline || '',
    location: user?.location || '',
  });

  // Convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Handle Image Upload (Cover or Avatar)
  const handleImageChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      
      // Immediate API call to save image
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      try {
        const { data } = await axios.put('/api/users/profile', { [field]: base64 }, config);
        onProfileUpdate(data); // Update parent state
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  // Handle Text Edit Submit
  const handleEditSubmit = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    try {
      const { data } = await axios.put('/api/users/profile', editData, config);
      onProfileUpdate(data);
      setOpen(false);
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
      
      {/* --- COVER PHOTO --- */}
      <Box 
        sx={{ 
          height: '200px', 
          bgcolor: 'grey.300',
          backgroundImage: user?.coverImage ? `url(${user.coverImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        {/* Edit Cover Button */}
        {isOwnProfile && (
          <IconButton 
            component="label"
            sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'white', '&:hover': { bgcolor: 'grey.200' } }}
          >
            <CameraAlt color="primary" />
            <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, 'coverImage')} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ px: 4, pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          {/* --- PROFILE PICTURE --- */}
          <Box sx={{ mt: -8, position: 'relative' }}>
            <Avatar 
              src={user?.avatar}
              sx={{ 
                width: 160, 
                height: 160, 
                border: '5px solid white', 
                bgcolor: 'primary.main',
                fontSize: '4rem'
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            
            {/* Edit Avatar Button */}
            {isOwnProfile && (
              <IconButton 
                component="label"
                sx={{ 
                  position: 'absolute', 
                  bottom: 10, 
                  right: 10, 
                  bgcolor: 'white', 
                  boxShadow: 2,
                  '&:hover': { bgcolor: 'grey.200' } 
                }}
              >
                <CameraAlt fontSize="small" color="primary" />
                <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, 'avatar')} />
              </IconButton>
            )}
          </Box>

          {/* Edit Info Button */}
          {isOwnProfile && (
            <IconButton onClick={() => setOpen(true)} sx={{ mt: 2 }}>
              <Edit />
            </IconButton>
          )}
        </Box>

        {/* --- USER INFO --- */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            {user?.name}
          </Typography>
          <Typography variant="h6" fontWeight="400" color="text.secondary">
            {user?.headline || 'Student at University'}
          </Typography>
          
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, color: 'text.secondary' }}>
            <LocationOn fontSize="small" />
            <Typography variant="body2">
              {user?.location || 'Location not set'}
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* --- EDIT MODAL --- */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Intro</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField 
              label="Full Name" 
              fullWidth 
              value={editData.name} 
              onChange={(e) => setEditData({ ...editData, name: e.target.value })} 
            />
            <TextField 
              label="Headline" 
              fullWidth 
              multiline
              rows={2}
              placeholder="e.g. Computer Science Student | React Enthusiast"
              value={editData.headline} 
              onChange={(e) => setEditData({ ...editData, headline: e.target.value })} 
            />
            <TextField 
              label="Location" 
              fullWidth 
              placeholder="City, Country"
              value={editData.location} 
              onChange={(e) => setEditData({ ...editData, location: e.target.value })} 
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

    </Paper>
  );
};

export default ProfileHeader;