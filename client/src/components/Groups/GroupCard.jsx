import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { PeopleAlt } from '@mui/icons-material';
import axios from 'axios';

const GroupCard = ({ group }) => {
  const currentUser = JSON.parse(localStorage.getItem('userInfo'));
  const [joined, setJoined] = useState(group.members.includes(currentUser._id));
  const [memberCount, setMemberCount] = useState(group.members.length);

  const handleJoin = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
      await axios.put(`/api/groups/${group._id}/join`, {}, config);
      setJoined(true);
      setMemberCount(prev => prev + 1);
    } catch (error) {
      console.error("Failed to join group");
    }
  };

  return (
    <Card sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={group.image}
        alt={group.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
          {group.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
          {group.description.length > 80 ? group.description.substring(0, 80) + '...' : group.description}
        </Typography>
        
        <Box display="flex" alignItems="center" color="text.secondary">
          <PeopleAlt fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="caption">{memberCount} Members</Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          fullWidth 
          variant={joined ? "outlined" : "contained"} 
          color={joined ? "inherit" : "primary"}
          onClick={handleJoin}
          disabled={joined}
        >
          {joined ? "Joined" : "Join Group"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default GroupCard;