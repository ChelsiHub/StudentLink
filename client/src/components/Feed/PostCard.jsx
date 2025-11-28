import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Avatar, 
  Typography, 
  IconButton, 
  Button, 
  Divider,
  Menu,
  MenuItem,
  Box // Added Box for layout 
} from '@mui/material';
import { 
  ThumbUpOutlined, ThumbUp, CommentOutlined, ShareOutlined, SendOutlined, 
  MoreVert, Delete, Photo, Videocam, Event, Article // Added icons for post types
} from '@mui/icons-material';

// --- Helper Functions and Component for Dynamic Content ---

// Maps postType to a friendly display name
const getPostTypeLabel = (type) => {
  switch(type) {
    case 'photo': return 'Photo Post';
    case 'video': return 'Video Post';
    case 'event': return 'Event';
    case 'article': return 'Article';
    default: return 'Text Post';
  }
}

// Maps postType to an icon
const getPostTypeIcon = (type) => {
  switch(type) {
    case 'photo': return <Photo sx={{ fontSize: 16, mr: 0.5 }} />;
    case 'video': return <Videocam sx={{ fontSize: 16, mr: 0.5 }} />;
    case 'event': return <Event sx={{ fontSize: 16, mr: 0.5 }} />;
    case 'article': return <Article sx={{ fontSize: 16, mr: 0.5 }} />;
    default: return null;
  }
}

// Component to handle rendering of media or link previews
const DynamicPostContent = ({ postType, mediaUrl, linkUrl }) => {
  // Renders an image with a fallback placeholder
  if (postType === 'photo' && mediaUrl) {
    return (
      <Box sx={{ mt: 2, borderRadius: 1, overflow: 'hidden' }}>
        <img 
          src={mediaUrl} 
          alt="Post Image" 
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400?text=Image+Not+Found"; }}
        />
      </Box>
    );
  }

  // Renders a video player
  if (postType === 'video' && mediaUrl) {
    return (
      <Box sx={{ mt: 2, borderRadius: 1, overflow: 'hidden' }}>
        <video controls style={{ width: '100%', maxHeight: '400px' }}>
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    );
  }

  // Renders a linked card for events or articles
  if ((postType === 'event' || postType === 'article') && linkUrl) {
    const icon = postType === 'event' ? <Event sx={{ mr: 1 }} /> : <Article sx={{ mr: 1 }} />;
    const title = postType === 'event' ? 'View Event' : 'Read Article';

    return (
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {postType.charAt(0).toUpperCase() + postType.slice(1)} Link:
        </Typography>
        <Button
          variant="outlined"
          startIcon={icon}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          sx={{ mt: 1, justifyContent: 'flex-start' }}
        >
          {title}
        </Button>
        <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', mt: 0.5 }}>
          {linkUrl}
        </Typography>
      </Box>
    );
  }

  return null;
};

// --- PostCard Component ---

const PostCard = ({ post, onDelete }) => {
  const [liked, setLiked] = useState(false);
  
  // Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Get current user ID to check ownership
  const currentUser = JSON.parse(localStorage.getItem('userInfo'));
  // Safe check: Is this MY post?
  const isMyPost = currentUser && (post.user?._id === currentUser._id || post.user === currentUser._id);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleMenuClose();
    // NOTE: window.confirm is restricted in this environment. 
    // Replace with a custom Material UI Dialog/Modal for confirmation in a production app.
    console.warn("Delete action initiated. Use a custom Modal for confirmation.");
    onDelete(post._id);
  };

  const timeAgo = post.createdAt 
    ? new Date(post.createdAt).toLocaleDateString(undefined, { 
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
      }) 
    : 'Just now';

  return (
    <Card sx={{ borderRadius: 2, mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }} aria-label="recipe">
            {post.user?.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
        }
        action={
          // Only show menu if it's my post
          isMyPost && (
            <>
              <IconButton aria-label="settings" onClick={handleMenuClick}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                  <Delete fontSize="small" sx={{ mr: 1 }} /> Delete Post
                </MenuItem>
              </Menu>
            </>
          )
        }
        title={<Typography fontWeight="bold">{post.user?.name || 'Unknown User'}</Typography>}
        // UPDATED: Show post type icon and label next to the timestamp
        subheader={
          <Box display="flex" alignItems="center">
            {getPostTypeIcon(post.postType)}
            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
              {getPostTypeLabel(post.postType)} 
            </Typography>
            • <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>{timeAgo}</Typography>
          </Box>
        }
      />
      
      <CardContent sx={{ py: 0 }}>
        <Typography variant="body1" color="text.primary" sx={{ whiteSpace: 'pre-line' }}>
          {post.content}
        </Typography>
        
        {/* NEW: Dynamic Post Content Rendering */}
        <DynamicPostContent 
          postType={post.postType} 
          mediaUrl={post.mediaUrl} 
          linkUrl={post.linkUrl} 
        />
        
      </CardContent>
      
      {/* Removed old post.image block as it's handled by DynamicPostContent */}

      <Divider sx={{ mt: 2, mb: 1 }} />

      <CardActions sx={{ justifyContent: 'space-around' }}>
        <Button 
          startIcon={liked ? <ThumbUp /> : <ThumbUpOutlined />} 
          color={liked ? "primary" : "inherit"}
          onClick={() => setLiked(!liked)}
          sx={{ textTransform: 'none' }}
        >
          Like
        </Button>
        <Button startIcon={<CommentOutlined />} color="inherit" sx={{ textTransform: 'none' }}>Comment</Button>
        <Button startIcon={<ShareOutlined />} color="inherit" sx={{ textTransform: 'none' }}>Share</Button>
        <Button startIcon={<SendOutlined />} color="inherit" sx={{ textTransform: 'none' }}>Send</Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;