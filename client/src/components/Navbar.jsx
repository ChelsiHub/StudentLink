import React from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Box,
  Container,
} from "@mui/material";
import {
  Search,
  Home,
  Work,
  Groups,
  Person,
  Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import logoImage from "../assets/logo.png"; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define paths where the Navbar should be HIDDEN
  const hideOnPaths = ["/", "/auth", "/onboarding"];

  // If current path is in the hide list, don't render anything
  if (hideOnPaths.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#ffffff",
        color: "#333",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* 1. LEFT: LOGO IMAGE */}
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/home")}
          >
            <img 
              src={logoImage} 
              alt="StudentLink" 
              style={{ height: "80px", objectFit: "contain" }} 
            />
          </Box>

          {/* 2. CENTER: SEARCH BAR */}
          <Box sx={{ display: { xs: "none", sm: "block" }, width: "35%" }}>
            <TextField
              fullWidth
              placeholder="Search users, jobs..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
                style: {
                  backgroundColor: "#f3f6f8",
                  borderRadius: "20px",
                  border: "none",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { border: "1px solid #1976d2" },
              }}
            />
          </Box>

          {/* 3. RIGHT: NAVIGATION ICONS */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Tooltip title="Feed">
              <IconButton onClick={() => navigate("/home")}>
                <Home
                  sx={{
                    fontSize: 28,
                    color:
                      location.pathname === "/home"
                        ? "primary.main"
                        : "text.secondary",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Jobs">
              <IconButton onClick={() => navigate("/jobs")}>
                <Work
                  sx={{
                    fontSize: 28,
                    color:
                      location.pathname === "/jobs"
                        ? "primary.main"
                        : "text.secondary",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Groups">
              <IconButton onClick={() => navigate("/groups")}>
                <Groups
                  sx={{
                    fontSize: 28,
                    color:
                      location.pathname === "/groups"
                        ? "primary.main"
                        : "text.secondary",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton onClick={() => navigate("/profile")}>
                <Person
                  sx={{
                    fontSize: 28,
                    color:
                      location.pathname === "/profile"
                        ? "primary.main"
                        : "text.secondary",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton onClick={handleLogout}>
                <Logout sx={{ fontSize: 28, color: "#dc004e" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;