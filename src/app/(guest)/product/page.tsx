// src/app/(guest)/product/page.tsx
import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import ProductCard from "@/component/client/product-card";
// import SectionTitle from "@/components/client/section-title";

// Dữ liệu mẫu (có thể thay bằng API sau)
const products = [
  {
    id: "1",
    image: "https://via.placeholder.com/345x300",
    name: "Zoofari Elephant T-Shirt",
    price: 25.99,
  },
  {
    id: "2",
    image: "https://via.placeholder.com/345x300",
    name: "Lion Plush Toy",
    price: 19.99,
  },
  {
    id: "3",
    image: "https://via.placeholder.com/345x300",
    name: "Safari Hat with Giraffe Print",
    price: 15.5,
  },
  {
    id: "4",
    image: "https://via.placeholder.com/345x300",
    name: "Zoofari Mug with Animal Print",
    price: 12.99,
  },
  {
    id: "5",
    image: "https://via.placeholder.com/345x300",
    name: "Elephant Statue",
    price: 45.0,
  },
  {
    id: "6",
    image: "https://via.placeholder.com/345x300",
    name: "Zoofari Keychain",
    price: 8.99,
  },
];

const ProductPage: React.FC = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", mb: 4, color: "text.secondary" }}
      >
        Discover unique souvenirs inspired by your favorite animals at Zoofari.
        From T-shirts to plush toys, we have it all!
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductPage;
