// src/app/(guest)/about/page.tsx
import React from "react";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
// import SectionTitle from "@/components/client/section-title";

const AboutPage: React.FC = () => {
  return (
    <Container sx={{ py: 8 }}>
      {/* <SectionTitle subtitle="About Us" title="Welcome to Zoofari" /> */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://via.placeholder.com/500x400"
            alt="Zoofari"
            sx={{ width: "100%", borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Our Story
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Zoofari was established in 1995 with a mission to conserve wildlife
            and educate the public about the beauty of nature. Over the years,
            we have grown into a leading zoo, housing over 500 species and
            welcoming thousands of visitors annually.
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We aim to protect endangered species, promote conservation efforts,
            and provide an unforgettable experience for families and wildlife
            enthusiasts.
          </Typography>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
