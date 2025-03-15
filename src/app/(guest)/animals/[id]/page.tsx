"use client";
import React, { use } from "react"; // Import hook `use` từ React
import { useRouter } from "next/navigation";
import { Container, Grid, Box, Typography, Button } from "@mui/material";

// Dữ liệu mẫu (thay bằng API call nếu cần)
const animalDetails = {
  "1": {
    name: "Elephant",
    image: "https://via.placeholder.com/500x400",
    description: "Largest land animal.",
    habitat: "Savanna",
    diet: "Herbivore",
  },
  "2": {
    name: "Lion",
    image: "https://via.placeholder.com/500x400",
    description: "The king of the jungle.",
    habitat: "Grasslands",
    diet: "Carnivore",
  },
  "3": {
    name: "Giraffe",
    image: "https://via.placeholder.com/500x400",
    description: "The tallest land animal.",
    habitat: "Savanna",
    diet: "Herbivore",
  },
};

const AnimalDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params); // Sử dụng `use` để giải nén params

  const animal = animalDetails[id as keyof typeof animalDetails]; // Tra cứu dữ liệu dựa trên id

  if (!animal) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" color="error">
          Animal Not Found
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => router.push("/animals")}
        >
          Back to List
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={animal.image}
            alt={animal.name}
            sx={{ width: "100%", borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            {animal.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {animal.description}
          </Typography>
          <Typography variant="h6">
            <strong>Habitat:</strong> {animal.habitat}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            <strong>Diet:</strong> {animal.diet}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.back()}
          >
            Back to List
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnimalDetailPage;
