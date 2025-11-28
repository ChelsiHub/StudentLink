import React, { useState } from 'react';
import { 
  Paper, Box, Typography, IconButton, Stack, Tooltip, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button 
} from '@mui/material';
import { 
  GitHub, LinkedIn, Language, Brush, Edit, Twitter 
} from '@mui/icons-material';
import axios from 'axios';

const SocialLinks = ({ user, isOwnProfile, onProfileUpdate }) => {
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState({
    github: user?.socialLinks?.github || '',
    linkedin: user?.socialLinks?.linkedin || '',
    portfolio: user?.socialLinks?.portfolio || '',
    behance: user?.socialLinks?.behance || '',
    twitter: user?.socialLinks?.twitter || '',
  });

  const handleSave = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    try {
      // Send the updated links object to the backend
      const { data } = await axios.put('/api/users/profile', { socialLinks: links }, config);
      onProfileUpdate(data);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update links", error);
    }
  };

  // Helper to render a link button
  const SocialIcon = ({ icon, url, color, name }) => {
    if (!url && !isOwnProfile) return null; // Don't show empty links to visitors

    return (
      <Tooltip title={url || "Not Connected"}>
        <IconButton 
          component="a"
          href={url ? (url.startsWith('http') ? url : `https://${url}`) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          disabled={!url}
          sx={{ 
            color: url ? color : 'action.disabled',
            border: '1px solid',
            borderColor: url ? `${color}40` : 'action.disabledBackground',
            bgcolor: url ? `${color}10` : 'transparent',
            '&:hover': { bgcolor: url ? `${color}20` : 'transparent' }
          }}
        >
          {icon}
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">On the Web</Typography>
        {isOwnProfile && (
          <IconButton size="small" onClick={() => setOpen(true)}>
            <Edit fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <SocialIcon icon={<GitHub />} url={links.github} color="#333" name="GitHub" />
        <SocialIcon icon={<LinkedIn />} url={links.linkedin} color="#0077b5" name="LinkedIn" />
        <SocialIcon icon={<Language />} url={links.portfolio} color="#E91E63" name="Portfolio" />
        <SocialIcon icon={<Brush />} url={links.behance} color="#1769ff" name="Behance" />
        <SocialIcon icon={<Twitter />} url={links.twitter} color="#1DA1F2" name="Twitter" />
      </Stack>

      {/* --- EDIT DIALOG --- */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Social Links</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField
              label="GitHub URL"
              placeholder="github.com/username"
              value={links.github}
              onChange={(e) => setLinks({...links, github: e.target.value})}
              InputProps={{ startAdornment: <GitHub sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
            <TextField
              label="LinkedIn URL"
              placeholder="linkedin.com/in/username"
              value={links.linkedin}
              onChange={(e) => setLinks({...links, linkedin: e.target.value})}
              InputProps={{ startAdornment: <LinkedIn sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
            <TextField
              label="Portfolio Website"
              placeholder="myportfolio.com"
              value={links.portfolio}
              onChange={(e) => setLinks({...links, portfolio: e.target.value})}
              InputProps={{ startAdornment: <Language sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
            <TextField
              label="Behance URL"
              placeholder="behance.net/username"
              value={links.behance}
              onChange={(e) => setLinks({...links, behance: e.target.value})}
              InputProps={{ startAdornment: <Brush sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
            <TextField
              label="Twitter / X"
              placeholder="twitter.com/username"
              value={links.twitter}
              onChange={(e) => setLinks({...links, twitter: e.target.value})}
              InputProps={{ startAdornment: <Twitter sx={{ mr: 1, color: 'text.secondary' }} /> }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SocialLinks;