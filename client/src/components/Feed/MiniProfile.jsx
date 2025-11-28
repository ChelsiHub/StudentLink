import React from 'react';
import { Paper, Typography, Avatar, Box, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MiniProfile = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative', bgcolor: 'white' }}>
      {/* Cover Image Background */}
      <Box sx={{ height: '70px', bgcolor: '#a0b4b7' }} />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: -4, mb: 2 }}>
        <Avatar 
          sx={{ width: 72, height: 72, border: '4px solid white', bgcolor: 'primary.main', fontSize: '2rem' }}
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
        
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1, cursor: 'pointer' }} onClick={() => navigate('/profile')}>
          {user?.name || 'Student User'}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student'}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>Profile views</Typography>
          <Typography variant="body2" fontWeight="bold" color="primary">42</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary" fontWeight={500}>Connections</Typography>
          <Typography variant="body2" fontWeight="bold" color="primary">18</Typography>
        </Box>
      </Box>

      <Divider />

      <Button 
        fullWidth 
        sx={{ p: 1.5, borderRadius: 0, textTransform: 'none', fontWeight: 'bold' }} 
        onClick={() => navigate('/profile')}
      >
        View Full Profile
      </Button>
    </Paper>
  );
};

export default MiniProfile;