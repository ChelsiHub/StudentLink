import React, { useState } from 'react';
import { Paper, Stack, Avatar, TextField, Button, Box, CircularProgress, Tooltip } from '@mui/material';
import { Image, YouTube, CalendarMonth, Article } from '@mui/icons-material';
import axios from 'axios';

// NOTE: Define your API base URL here if you are using an absolute path, 
// otherwise, axios will attempt to use a relative path like: https://<your-domain>/api/posts
// If running locally, this should be something like 'http://localhost:5000'
const API_BASE_URL = ''; // Leave blank if you use proxy in package.json or running on the same domain

const CreatePostWidget = ({ user, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('text'); // Default type
  const [mediaUrl, setMediaUrl] = useState('');     // For photo/video URLs
  const [linkUrl, setLinkUrl] = useState('');       // For event/article links
  const [loading, setLoading] = useState(false);

  const iconOptions = [
    { type: 'photo', label: 'Photo', icon: <Image color={postType === 'photo' ? 'primary' : 'inherit'} /> },
    { type: 'video', label: 'Video', icon: <YouTube color={postType === 'video' ? 'success' : 'inherit'} /> },
    { type: 'event', label: 'Event', icon: <CalendarMonth color={postType === 'event' ? 'warning' : 'inherit'} /> },
    { type: 'article', label: 'Article', icon: <Article color={postType === 'article' ? 'error' : 'inherit'} />, hidden: true },
  ];

  const handleIconClick = (type) => {
    // If the same icon is clicked, reset to text post
    if (postType === type) {
      setPostType('text');
      setMediaUrl('');
      setLinkUrl('');
      return;
    }

    setPostType(type);
    setMediaUrl(''); // Clear URLs on type switch
    setLinkUrl('');
  };

  /**
   * Validation function to determine if the post button should be enabled.
   */
  const isPostValid = () => {
    if (postType === 'text') {
      return content.trim().length > 0;
    }
    if (postType === 'photo' || postType === 'video') {
      // Requires at least a media URL
      return mediaUrl.trim().length > 0;
    }
    if (postType === 'event' || postType === 'article') {
      // Requires at least a link URL
      return linkUrl.trim().length > 0;
    }
    return false;
  };

  const handlePost = async () => {
    if (!isPostValid()) {
      console.warn("Validation failed: Required fields for the selected post type are empty.");
      return;
    }
    
    setLoading(true);
    
    // --- API Setup ---
    const postUrl = `${API_BASE_URL}/api/posts`;
    let userInfo;
    try {
        userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
            throw new Error("User not authenticated. Missing token.");
        }
    } catch (e) {
        console.error("Authentication Error:", e.message);
        setLoading(false);
        return;
    }

    const config = { 
        headers: { 
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json' 
        } 
    };
    
    const payload = {
        content: content,
        postType: postType,
        mediaUrl: (postType === 'photo' || postType === 'video') ? mediaUrl : undefined,
        linkUrl: (postType === 'event' || postType === 'article') ? linkUrl : undefined,
    };
    // -----------------

    console.log("Attempting to POST to:", postUrl);
    console.log("Payload:", payload);

    try {
      const { data } = await axios.post(postUrl, payload, config);
      
      console.log("Post successful. Response:", data); // Log success
      onPostCreated(data); 
      // Reset all states
      setContent('');
      setPostType('text');
      setMediaUrl('');
      setLinkUrl('');
    } catch (error) {
        // Log the specific error details that caused the 404
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx (e.g., 404, 500)
            console.error(
                `API Error (${error.response.status}): The URL ${postUrl} was not found on the server.`,
                error.response.data
            );
        } else if (error.request) {
            // The request was made but no response was received (e.g., network error)
            console.error("Network Error: No response received from server.", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Request Setup Error:", error.message);
        }
    } finally {
      setLoading(false);
    }
  };

  const renderSpecializedInput = () => {
    let placeholder = `Enter ${postType.charAt(0).toUpperCase() + postType.slice(1)} URL or Link`;
    let urlState = mediaUrl;
    let setUrlState = setMediaUrl;

    if (postType === 'event' || postType === 'article') {
      urlState = linkUrl;
      setUrlState = setLinkUrl;
    }
    
    if (postType === 'text') {
      return null;
    }

    return (
      <TextField 
        fullWidth 
        variant="outlined"
        placeholder={placeholder} 
        size="small"
        value={urlState}
        onChange={(e) => setUrlState(e.target.value)}
        sx={{ 
          mt: 1, 
          '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f8f8f8' }
        }}
      />
    );
  };

  return (
    <Paper sx={{ p: 2, borderRadius: 2, mb: 3 }}>
      <Stack direction="row" spacing={2} mb={2}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
        <TextField 
          fullWidth 
          multiline
          minRows={1}
          placeholder={postType === 'text' ? "Start a post..." : "Add a description..."} 
          size="small" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ 
            '& .MuiOutlinedInput-root': { borderRadius: 5, bgcolor: '#f8f8f8' }
          }}
        />
      </Stack>
      
      {/* Dynamic URL Input Field */}
      {renderSpecializedInput()}
      
      <Stack direction="row" justifyContent="space-between" px={1} alignItems="center" pt={1}>
        <Stack direction="row" spacing={1}>
          {iconOptions.map((item) => (
            <Tooltip title={item.label} key={item.type}>
              <Button
                startIcon={item.icon}
                size="small"
                onClick={() => handleIconClick(item.type)}
                sx={{ 
                  textTransform: 'none', 
                  color: postType === item.type ? 'primary.main' : 'text.secondary',
                  bgcolor: postType === item.type ? 'primary.light' : 'transparent',
                  ':hover': { bgcolor: postType === item.type ? 'primary.light' : 'grey.100' },
                  display: item.hidden ? { xs: 'none', sm: 'inline-flex'} : 'inline-flex'
                }}
              >
                {item.label}
              </Button>
            </Tooltip>
          ))}
        </Stack>
        
        <Button 
          variant="contained" 
          disabled={!isPostValid() || loading} 
          onClick={handlePost}
          sx={{ borderRadius: 5, px: 3 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Post'}
        </Button>
      </Stack>
    </Paper>
  );
};

export default CreatePostWidget;