import React from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, CardActions, Button, 
  Chip, Divider, Stack, Container, useTheme 
} from '@mui/material';
import { Work, LocationOn, AttachMoney, Schedule } from '@mui/icons-material';

// --- Dummy Data for Visualization ---
const dummyJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer (React)',
    company: 'Innovate Solutions Inc.',
    location: 'Remote (US/Canada)',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    description: 'Lead the development of next-generation user interfaces for our flagship SaaS platform using React, TypeScript, and Tailwind CSS. Requires 5+ years experience.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
  },
  {
    id: 2,
    title: 'Cloud Infrastructure Engineer',
    company: 'Global Data Corp',
    location: 'Seattle, WA',
    salary: '$140,000 - $180,000',
    type: 'Full-time',
    description: 'Design, deploy, and manage highly scalable infrastructure on AWS and Kubernetes. Experience with Terraform and CI/CD pipelines is mandatory.',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'DevOps', 'Go'],
  },
  {
    id: 3,
    title: 'Junior Marketing Analyst',
    company: 'Spark Digital Agency',
    location: 'New York, NY',
    salary: '$55,000 - $70,000',
    type: 'Entry-Level',
    description: 'Assist the marketing team with data analysis, campaign performance tracking, and report generation. Must be proficient in Excel and Google Analytics.',
    tags: ['Analytics', 'Excel', 'Google Ads', 'SEO'],
  },
  {
    id: 4,
    title: 'Part-Time Content Writer',
    company: 'The Daily Byte',
    location: 'Remote',
    salary: '$30 - $45 / hour',
    type: 'Part-time',
    description: 'Write engaging, SEO-optimized articles and blog posts on technology trends. Minimum 15 hours per week required.',
    tags: ['SEO', 'Blogging', 'Editing', 'Tech'],
  },
];

// --- Job Card Component ---
const JobCard = ({ job }) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-3px)',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="h6" 
          component="div" 
          fontWeight="bold"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          {job.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
          {job.company}
        </Typography>
        
        <Divider sx={{ mb: 1.5 }} />

        <Stack spacing={1} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2">{job.location}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AttachMoney fontSize="small" color="success" />
            <Typography variant="body2" fontWeight="medium">{job.salary}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Schedule fontSize="small" color="info" />
            <Chip label={job.type} size="small" color="secondary" />
          </Stack>
        </Stack>

        <Typography variant="body2" color="text.primary" sx={{ 
          // Limit description length for a cleaner card look
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          height: '4.5em' // Approx 3 lines of text
        }}>
          {job.description}
        </Typography>

        <Box sx={{ mt: 2 }}>
          {job.tags.map((tag) => (
            <Chip 
              key={tag} 
              label={tag} 
              size="small" 
              sx={{ mr: 0.5, mb: 0.5, bgcolor: theme.palette.grey[100] }}
            />
          ))}
        </Box>
      </CardContent>
      
      <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end', p: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="small"
          sx={{ borderRadius: 5, textTransform: 'none' }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

// --- Main Screen Component ---
const JobBoardScreen = () => {
  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="700">
          Find Your Next Opportunity
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {dummyJobs.length} Job Listings Available
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {dummyJobs.map((job) => (
          <Grid item key={job.id} xs={12} sm={6} md={4}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      
      {/* Placeholder for future pagination or load more */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button variant="outlined" size="large">
          Load More Jobs
        </Button>
      </Box>
    </Container>
  );
};

export default JobBoardScreen;