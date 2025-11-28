import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import authImage from "../assets/auth-illustration.png";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.tab !== undefined) {
      setTabIndex(location.state.tab);
    }
  }, [location.state]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (tabIndex === 1 && formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const endpoint =
        tabIndex === 0 ? "/api/auth/login" : "/api/auth/register";
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      if (tabIndex === 1) {
        payload.name = formData.name;
        payload.role = formData.role;
      }

      const res = await axios.post(endpoint, payload);
      localStorage.setItem("userInfo", JSON.stringify(res.data));

      // --- REDIRECT LOGIC ---
      if (tabIndex === 1) {
        // Register -> Onboarding
        alert("Registration Successful! Redirecting to profile setup...");
        navigate("/onboarding");
      } else {
        // Login -> Home
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    // OUTER CONTAINER: FLEX ROW
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        zIndex: 1200,
      }}
    >
      {/* LEFT SIDE: ILLUSTRATION (Flex Item 1) */}
      <Box
        sx={{
          flex: 1, // Takes up 50% of space
          backgroundImage: `url(${authImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex", // Flex enabled to center the overlay text
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* TEXT OVERLAY */}
        <Box
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.6)",
            p: 4,
            borderRadius: 4,
            color: "white",
            textAlign: "center",
            maxWidth: "80%",
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to StudentLink
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 300 }}>
            Your gateway to professional growth.
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE: FORM (Flex Item 2) */}
      <Box
        component={Paper}
        elevation={0}
        square
        sx={{
          flex: 1, // Takes up 50% of space
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "450px",
            px: 4, // Horizontal padding
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            fontWeight="bold"
            align="center"
            sx={{ mb: 3 }}
          >
            {tabIndex === 0 ? "Sign In" : "Create Account"}
          </Typography>

          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              mb: 4,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit}>
            {/* Register Fields */}
            {tabIndex === 1 && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Full Name"
                name="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />

            {tabIndex === 1 && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
                  <FormLabel component="legend">I am a...</FormLabel>
                  <RadioGroup
                    row
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Student"
                    />
                    <FormControlLabel
                      value="alumni"
                      control={<Radio />}
                      label="Alumni"
                    />
                    <FormControlLabel
                      value="recruiter"
                      control={<Radio />}
                      label="Recruiter"
                    />
                  </RadioGroup>
                </FormControl>
              </>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              {loading
                ? "Processing..."
                : tabIndex === 0
                ? "Sign In"
                : "Join StudentLink"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;