import React from "react";
import { Container, Grid, Box, Button, Typography } from "@mui/material";

import Link from "next/link";

const animals = [
  {
    id: "1",
    image: "https://via.placeholder.com/345x280",
    name: "Elephant",
    description: "Majestic and intelligent, the elephant is a gentle giant.",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/345x280",
    name: "Lion",
    description: "The king of the jungle, known for its strength and pride.",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/345x280",
    name: "Giraffe",
    description: "The tallest land animal with a long neck and unique spots.",
  },
];

const Animal = () => {
  return (
    <Container sx={{ py: 8 }}>
      {/* <Grid subtitle="Our Animals" title="Discover Our Wildlife" /> */}
      <Grid container spacing={4}>
        {animals.map((animal) => (
          <Grid item xs={12} sm={6} md={4} key={animal.id}>
            <Box sx={{ textAlign: "center" }}>
              {/* <AnimalCard image={animal.image} name={animal.name} /> */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {animal.description}
                </Typography>
                <Link href={`/animals/${animal.id}`} passHref legacyBehavior>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    View Details
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Animal;
