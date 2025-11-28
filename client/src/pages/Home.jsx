import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import MiniProfile from '../components/Feed/MiniProfile';
import CreatePostWidget from '../components/Feed/CreatePostWidget';
import PostCard from '../components/Feed/PostCard';
import Recommendations from '../components/Feed/Recommendations';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const user = JSON.parse(localStorage.getItem('userInfo')) || { name: 'Guest', role: 'Visitor' };

  const fetchPosts = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      
      const { data } = await axios.get('/api/posts', config);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // NEW FUNCTION: Handle Deletion
  const handleDeletePost = async (postId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };

      await axios.delete(`/api/posts/${postId}`, config);
      
      // Update UI by filtering out the deleted post
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', pt: 3, pb: 5 }}>
      <Container maxWidth="lg">
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'flex-start', 
            gap: 3 
          }}
        >
          
          <Box 
            sx={{ 
              flexBasis: '25%', 
              minWidth: '220px', 
              display: { xs: 'none', md: 'block' }, 
              position: 'sticky', 
              top: '80px' 
            }}
          >
            <MiniProfile user={user} />
          </Box>

          <Box 
            sx={{ 
              flex: 1, 
              maxWidth: '600px', 
              width: '100%' 
            }}
          >
            <CreatePostWidget user={user} onPostCreated={handleNewPost} />
            
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {posts.map(post => (
                  <PostCard 
                    key={post._id} 
                    post={post} 
                    onDelete={handleDeletePost} // Pass the delete function down
                  />
                ))}
                {posts.length === 0 && (
                  <Typography textAlign="center" color="text.secondary" py={4}>
                    No posts yet. Be the first to share something!
                  </Typography>
                )}
              </>
            )}
          </Box>

          <Box 
            sx={{ 
              flexBasis: '25%', 
              minWidth: '220px', 
              display: { xs: 'none', md: 'block' }, 
              position: 'sticky', 
              top: '80px' 
            }}
          >
            <Recommendations />
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default Home;