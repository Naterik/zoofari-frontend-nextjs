// components/client/product-card.tsx
import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
}) => (
  <Card
    sx={{
      borderRadius: 2,
      boxShadow: "none",
      border: "1px solid #e0e0e0",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      },
      position: "relative",
    }}
  >
    <CardActionArea component={Link} href={`/product/${id}`}>
      <CardMedia
        component="img"
        height="300"
        image={image}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            mb: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="primary">
          ${price.toFixed(2)}
        </Typography>
      </CardContent>
    </CardActionArea>
    <Box
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "white",
        borderRadius: "50%",
        p: 1,
        cursor: "pointer",
        "&:hover": { backgroundColor: "#f5f5f5" },
      }}
    >
      <FavoriteBorderIcon sx={{ color: "#FF9800" }} />
    </Box>
  </Card>
);

export default ProductCard;
