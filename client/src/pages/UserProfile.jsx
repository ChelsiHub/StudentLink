import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
// Component Imports
import ProfileHeader from '../components/Profile/ProfileHeader';
import SocialLinks from '../components/Profile/SocialLinks';
import SkillsSection from '../components/Profile/SkillsSection';
import EducationSection from '../components/Profile/EducationSection'; // <--- NEW IMPORT

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem('userInfo'));
  const isOwnProfile = true; 

  const fetchProfile = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      };
      const { data } = await axios.get(`/api/users/${currentUser._id}`, config);
      setUser(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchProfile();
    }
  }, []);

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    const newStorage = { ...currentUser, name: updatedUser.name, role: updatedUser.role };
    localStorage.setItem('userInfo', JSON.stringify(newStorage));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        
        {/* SECTION A: HERO */}
        <ProfileHeader 
          user={user} 
          isOwnProfile={isOwnProfile} 
          onProfileUpdate={handleProfileUpdate} 
        />

        {/* SECTION B: SOCIAL LINKS */}
        <SocialLinks 
          user={user} 
          isOwnProfile={isOwnProfile} 
          onProfileUpdate={handleProfileUpdate} 
        />

        {/* SECTION C: SKILLS */}
        <SkillsSection 
          user={user} 
          isOwnProfile={isOwnProfile} 
          onProfileUpdate={handleProfileUpdate} 
        />

        {/* SECTION D: EDUCATION TIMELINE */}
        <EducationSection 
          user={user} 
          isOwnProfile={isOwnProfile} 
          onProfileUpdate={handleProfileUpdate} 
        />

      </Container>
    </Box>
  );
};

export default UserProfile;