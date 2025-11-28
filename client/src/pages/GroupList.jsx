import React from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, CardActions, Button, 
  Chip, Divider, Stack, Container, useTheme, Avatar, AvatarGroup 
} from '@mui/material';
import { Group, Code, DesignServices, TrendingUp, Cloud } from '@mui/icons-material';

// --- Dummy Data for Visualization ---
const dummyGroups = [
  {
    id: 1,
    name: 'The React Roundtable',
    focus: 'Frontend Development',
    description: 'A community for sharing best practices, solving complex state management issues, and discussing the future of React and related libraries (Next.js, Remix).',
    members: 1250,
    icon: <Code />,
    avatarUrls: ['https://placehold.co/100x100/50c6f5/white?text=A', 'https://placehold.co/100x100/f55074/white?text=B', 'https://placehold.co/100x100/a250f5/white?text=C', 'https://placehold.co/100x100/50f57d/white?text=D'],
  },
  {
    id: 2,
    name: 'AWS & Cloud Architects',
    focus: 'DevOps & Cloud',
    description: 'Dedicated to discussions on AWS architecture patterns, serverless computing (Lambda), security best practices, and cost optimization strategies.',
    members: 890,
    icon: <Cloud />,
    avatarUrls: ['https://placehold.co/100x100/50c6f5/white?text=E', 'https://placehold.co/100x100/a250f5/white?text=F', 'https://placehold.co/100x100/50f57d/white?text=G'],
  },
  {
    id: 3,
    name: 'UX/UI Design Thinkers',
    focus: 'Product Design',
    description: 'Critique and discussion space for user experience (UX) research, interface (UI) design trends, accessibility standards, and prototyping tools like Figma.',
    members: 512,
    icon: <DesignServices />,
    avatarUrls: ['https://placehold.co/100x100/f55074/white?text=H', 'https://placehold.co/100x100/50c6f5/white?text=I'],
  },
  {
    id: 4,
    name: 'Growth Hacking Strategies',
    focus: 'Marketing & Strategy',
    description: 'Sharing high-leverage tactics for rapid business growth, A/B testing insights, SEO tips, and conversion rate optimization (CRO) techniques.',
    members: 2400,
    icon: <TrendingUp />,
    avatarUrls: ['https://placehold.co/100x100/a250f5/white?text=J', 'https://placehold.co/100x100/50f57d/white?text=K', 'https://placehold.co/100x100/f55074/white?text=L', 'https://placehold.co/100x100/50c6f5/white?text=M', 'https://placehold.co/100x100/a250f5/white?text=N'],
  },
];

// --- Group Card Component ---
const GroupCard = ({ group }) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: 4,
        transition: '0.3s',
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
          boxShadow: 8,
          transform: 'translateY(-4px)',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
            {group.icon}
          </Avatar>
          <Chip label={group.focus} size="small" color="secondary" variant="outlined" />
        </Stack>

        <Typography 
          variant="h5" 
          component="div" 
          fontWeight="bold"
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          {group.name}
        </Typography>
        
        <Divider sx={{ mb: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ 
          // Limit description length for a cleaner card look
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          minHeight: '4.5em'
        }}>
          {group.description}
        </Typography>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" fontWeight="600" color="primary">
            {group.members.toLocaleString()} Members
          </Typography>
          
          <AvatarGroup max={4}>
            {group.avatarUrls.map((url, index) => (
              <Avatar key={index} alt={`Member ${index + 1}`} src={url} sx={{ width: 30, height: 30 }} />
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, justifyContent: 'flex-end', borderTop: `1px solid ${theme.palette.grey[100]}` }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="small"
          startIcon={<Group />}
          sx={{ borderRadius: 8, textTransform: 'none' }}
        >
          Join Group
        </Button>
      </CardActions>
    </Card>
  );
};

// --- Main Screen Component ---
const GroupsScreen = () => {
  const theme = useTheme();
  
  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 6, minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="800" color="primary">
          Community Hub
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Explore and join professional groups focused on your interests.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {dummyGroups.map((group) => (
          <Grid item key={group.id} xs={12} sm={6} lg={3}>
            <GroupCard group={group} />
          </Grid>
        ))}
      </Grid>
      
      {/* Call to action for creating a new group */}
      <Box sx={{ textAlign: 'center', mt: 8, p: 4, border: `2px dashed ${theme.palette.grey[300]}`, borderRadius: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Can't find what you're looking for?
        </Typography>
        <Button 
          variant="outlined" 
          size="large"
          color="secondary"
          startIcon={<Group />}
          sx={{ borderRadius: 5 }}
        >
          Create a New Group
        </Button>
      </Box>
    </Container>
  );
};

export default GroupsScreen;