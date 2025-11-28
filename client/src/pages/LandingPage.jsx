import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Reverted to local import as requested
import heroImage from "../assets/hero-image.png";
import { Grid, Card, CardContent } from "@mui/material";
import { Groups, TrendingUp, Work } from "@mui/icons-material";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* SECTION A: HERO SECTION */}
      <Box
        sx={{
          width: "100%",
          height: "90vh", // Takes up 90% of the viewport height
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff", // White text for contrast
        }}
      >
        {/* Dark Overlay - Essential for text readability over images */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // 60% opacity black overlay
            zIndex: 1,
          }}
        />

        {/* Main Content */}
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 2, // Ensures text sits on top of the overlay
            textAlign: "center",
          }}
        >
          {/* Headline */}
          <Typography
            variant="h2"
            component="h1"
            fontWeight="700"
            gutterBottom
            sx={{
              fontSize: "4rem", // Fixed desktop font size
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Bridge the Gap Between Campus and Career
          </Typography>

          {/* Sub-headline */}
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 5, // Margin bottom
              fontSize: "1.5rem", // Fixed desktop font size
              fontWeight: 300,
              opacity: 0.9,
            }}
          >
            Connect with peers, find internships, and develop essential skills.
          </Typography>

          {/* Action Buttons */}
          <Stack
            direction="row" // Always horizontal row
            spacing={3}
            justifyContent="center"
          >
            {/* Primary Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/auth", { state: { tab: 1 } })}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: "50px", // Rounded pill shape
              }}
            >
              Join StudentLink
            </Button>

            {/* Secondary Button */}
            <Button
              variant="outlined"
              color="inherit" // Inherits white color from parent Box
              size="large"
              onClick={() => navigate("/auth", { state: { tab: 0 } })}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1.1rem",
                borderColor: "#ffffff",
                borderWidth: "2px",
                borderRadius: "50px",
                "&:hover": {
                  borderColor: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* SECTION B: FEATURES GRID */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack
          direction="row" // Always horizontal row
          spacing={4}
          justifyContent="center"
          alignItems="stretch" // Ensures all cards are same height
        >
          {/* Feature 1: Connect */}
          <Box sx={{ flex: 1, width: "100%" }}>
            {" "}
            {/* Flex 1 makes them equal width */}
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 3,
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-8px)" },
              }}
            >
              <CardContent>
                <Groups sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  fontWeight="bold"
                >
                  Connect
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Find peers and mentors to expand your network.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Feature 2: Growth */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 3,
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-8px)" },
              }}
            >
              <CardContent>
                <TrendingUp
                  sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
                />
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  fontWeight="bold"
                >
                  Growth
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Track your professional development and skills.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Feature 3: Internships */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 3,
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-8px)" },
              }}
            >
              <CardContent>
                <Work sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  fontWeight="bold"
                >
                  Internships
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Exclusive student opportunities to kickstart your career.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>

      {/* SECTION C: FOOTER */}
      <Box
        component="footer"
        sx={{
          bgcolor: "#0d1b2a", // Dark Navy/Black color
          color: "white",
          py: 4, // Vertical padding
          mt: "auto", // Pushes footer to bottom if content is short
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row" // Always horizontal row
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            {/* Copyright Text */}
            <Typography variant="body2" color="grey.400">
              © {new Date().getFullYear()} StudentLink. All rights reserved.
            </Typography>

            {/* Links */}
            <Stack direction="row" spacing={4}>
              <Typography
                component="a"
                href="#" // Placeholder link
                sx={{
                  color: "grey.400",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": { color: "white" }, // Light up on hover
                }}
              >
                About Us
              </Typography>

              <Typography
                component="a"
                href="#" // Placeholder link
                sx={{
                  color: "grey.400",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": { color: "white" },
                }}
              >
                Contact
              </Typography>

              <Typography
                component="a"
                href="#"
                sx={{
                  color: "grey.400",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": { color: "white" },
                }}
              >
                Privacy Policy
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;