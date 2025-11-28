import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Avatar, Chip, Stack } from '@mui/material';
import { Business, LocationOn, WorkOutline } from '@mui/icons-material';
import axios from 'axios';

const JobCard = ({ job }) => {
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      await axios.post(`/api/jobs/${job._id}/apply`, {}, config);
      setApplied(true);
      alert(`Successfully applied to ${job.title} at ${job.company}`);
    } catch (error) {
      if(error.response?.status === 400) {
        setApplied(true); // Already applied
        alert("You have already applied to this job.");
      } else {
        alert("Failed to apply. Please try again.");
      }
    }
  };

  return (
    <Card sx={{ display: 'flex', p: 2, mb: 2, alignItems: 'center', borderRadius: 2 }}>
      {/* Company Logo (Placeholder) */}
      <Avatar 
        variant="rounded" 
        sx={{ width: 60, height: 60, mr: 3, bgcolor: 'primary.light' }}
      >
        <Business />
      </Avatar>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {job.title}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {job.company}
        </Typography>
        
        <Stack direction="row" spacing={2} mt={1} alignItems="center">
          <Box display="flex" alignItems="center" color="text.secondary">
            <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{job.location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" color="text.secondary">
            <WorkOutline fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{job.workMode}</Typography>
          </Box>
          <Chip label={job.type} size="small" color="secondary" variant="outlined" />
        </Stack>
      </Box>

      <Button 
        variant="contained" 
        color={applied ? "success" : "primary"} 
        onClick={handleApply}
        disabled={applied}
        sx={{ borderRadius: 5, px: 3, textTransform: 'none' }}
      >
        {applied ? "Applied" : "Easy Apply"}
      </Button>
    </Card>
  );
};

export default JobCard;