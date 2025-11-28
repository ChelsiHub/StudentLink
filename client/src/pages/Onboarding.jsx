import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Grid,
  Snackbar,
  Alert,
  Chip,
  Stack
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const steps = ['University Details', 'Upload Resume', 'Initial Skills'];

// Pre-defined skills for the Autocomplete (you can add more)
const skillOptions = [
  'React', 'Node.js', 'MongoDB', 'Express', 'Python', 'Java', 
  'C++', 'Data Analysis', 'UI/UX Design', 'Marketing', 'Public Speaking',
  'Project Management', 'Git', 'SQL', 'Machine Learning'
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, msg: '', type: 'success' });

  // Form State
  const [formData, setFormData] = useState({
    university: '',
    degree: '',
    year: '',
    skills: [],
    resumeName: '' // For MVP, we store the filename. In prod, this would be a URL.
  });

  // Handle Next Button Logic
  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.university || !formData.degree) {
        setAlert({ open: true, msg: 'Please fill in all university details', type: 'error' });
        return;
      }
    }
    
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // API Call to Save Data
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      if (!userInfo || !userInfo.token) {
        navigate('/auth');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const payload = {
        education: [{
          school: formData.university,
          degree: formData.degree,
          year: formData.year
        }],
        skills: formData.skills,
        resume: formData.resumeName
      };

      await axios.put('/api/users/profile', payload, config);
      
      setAlert({ open: true, msg: 'Profile Setup Complete!', type: 'success' });
      
      // Redirect to Home after a short delay
      setTimeout(() => {
        navigate('/home');
      }, 1500);

    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Error updating profile";
      setAlert({ open: true, msg: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Helper to handle file selection (Simulation)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resumeName: file.name });
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default', 
        display: 'flex', 
        alignItems: 'center', 
        py: 4 
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
            Set Up Your Profile
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Let's get you ready for the professional world.
          </Typography>
          
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* STEP CONTENT AREA */}
          <Box sx={{ minHeight: '250px' }}>
            
            {/* STEP 1: EDUCATION */}
            {activeStep === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="University / College" 
                    variant="outlined"
                    placeholder="e.g. Harvard University"
                    value={formData.university}
                    onChange={(e) => setFormData({...formData, university: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Degree / Major" 
                    variant="outlined"
                    placeholder="e.g. B.Sc Computer Science"
                    value={formData.degree}
                    onChange={(e) => setFormData({...formData, degree: e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Year of Graduation" 
                    type="number"
                    placeholder="e.g. 2025"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                  />
                </Grid>
              </Grid>
            )}

            {/* STEP 2: RESUME */}
            {activeStep === 1 && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%',
                  border: '2px dashed #e0e0e0',
                  borderRadius: 2,
                  p: 4,
                  bgcolor: 'background.default'
                }}
              >
                <CloudUpload sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Upload your Resume
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                  PDF format only. Max size 5MB.
                </Typography>
                
                <Button variant="contained" component="label">
                  Choose File
                  <input 
                    type="file" 
                    hidden 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                  />
                </Button>
                
                {formData.resumeName && (
                  <Chip 
                    label={formData.resumeName} 
                    color="success" 
                    sx={{ mt: 3 }} 
                    onDelete={() => setFormData({...formData, resumeName: ''})}
                  />
                )}
              </Box>
            )}

            {/* STEP 3: SKILLS */}
            {activeStep === 2 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  What are your top skills?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Add at least 3 skills to help recruiters find you.
                </Typography>
                
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={skillOptions}
                  freeSolo
                  value={formData.skills}
                  onChange={(event, newValue) => {
                    setFormData({ ...formData, skills: newValue });
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip 
                        variant="outlined" 
                        label={option} 
                        color="primary"
                        {...getTagProps({ index })} 
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select or Type Skills"
                      placeholder="Skills"
                    />
                  )}
                />
              </Box>
            )}
          </Box>

          {/* NAVIGATION BUTTONS */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, mt: 2, borderTop: '1px solid #f0f0f0' }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button 
              onClick={handleNext} 
              variant="contained"
              size="large"
              disabled={loading}
            >
              {activeStep === steps.length - 1 ? (loading ? 'Finishing...' : 'Finish Setup') : 'Next'}
            </Button>
          </Box>

        </Paper>
      </Container>

      {/* ALERT TOAST */}
      <Snackbar 
        open={alert.open} 
        autoHideDuration={3000} 
        onClose={() => setAlert({...alert, open: false})}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alert.type} variant="filled">
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Onboarding;