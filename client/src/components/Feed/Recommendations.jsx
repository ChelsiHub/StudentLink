import React from 'react';
import { Paper, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Box } from '@mui/material';
import { Add, WorkOutline } from '@mui/icons-material';

const Recommendations = () => {
  // Dummy Data for People
  const people = [
    { id: 1, name: 'Sarah Johnson', role: 'UX Designer @ Google', initial: 'S' },
    { id: 2, name: 'David Lee', role: 'CS Student @ MIT', initial: 'D' },
    { id: 3, name: 'Emily Chen', role: 'Product Manager', initial: 'E' },
  ];

  // Dummy Data for Jobs
  const jobs = [
    { id: 1, title: 'Frontend Intern', company: 'Spotify', location: 'Remote' },
    { id: 2, title: 'Jr. React Dev', company: 'Netflix', location: 'New York, NY' },
  ];

  return (
    <Box>
      {/* Section 1: People */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          People you may know
        </Typography>
        
        <List disablePadding>
          {people.map((person) => (
            <ListItem key={person.id} alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <Avatar>{person.initial}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={person.name}
                secondary={
                  <Box display="flex" flexDirection="column">
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {person.role}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      startIcon={<Add />}
                      sx={{ mt: 1, borderRadius: 5, textTransform: 'none', width: 'fit-content' }}
                    >
                      Connect
                    </Button>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Section 2: Recommended Jobs */}
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Recommended Jobs
        </Typography>
        
        <List disablePadding>
          {jobs.map((job) => (
            <ListItem key={job.id} disableGutters sx={{ mb: 1 }}>
              <ListItemAvatar>
                <Avatar variant="rounded" sx={{ bgcolor: 'grey.200', color: 'grey.700' }}>
                  <WorkOutline />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={job.title}
                secondary={`${job.company} • ${job.location}`}
                primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 'bold' }}
              />
            </ListItem>
          ))}
        </List>
        <Button color="inherit" size="small" sx={{ mt: 1, textTransform: 'none' }}>
          View all jobs →
        </Button>
      </Paper>
    </Box>
  );
};

export default Recommendations;