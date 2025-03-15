"use client";
import React, { useState, useEffect, use } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Rating,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Link from "next/link";
import ProductImageSlider from "@/component/client/product-image-slider";
import ProductSizeSelector from "@/component/client/product-size-selector";
import ProductCard from "@/component/client/product-card";

// Dữ liệu mẫu (có thể thay bằng API sau)
const productDetails = {
  "1": {
    name: "Zoofari Elephant T-Shirt",
    price: 25.99,
    description:
      "A comfortable cotton T-shirt featuring a beautiful elephant print. Perfect for animal lovers!",
    images: [
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 120,
    userReviews: [
      {
        id: 1,
        user: "John Doe",
        rating: 4.5,
        comment: "Great quality and design!",
      },
      {
        id: 2,
        user: "Jane Smith",
        rating: 4.0,
        comment: "Love the elephant print!",
      },
      {
        id: 3,
        user: "Mike Wilson",
        rating: 5.0,
        comment: "Perfect fit and fast shipping!",
      },
    ],
    relatedProducts: [
      {
        id: "2",
        name: "Lion Plush Toy",
        price: 19.99,
        image: "https://via.placeholder.com/345x300",
      },
      {
        id: "3",
        name: "Safari Hat with Giraffe Print",
        price: 15.5,
        image: "https://via.placeholder.com/345x300",
      },
    ],
  },
  "2": {
    name: "Lion Plush Toy",
    price: 19.99,
    description:
      "A cuddly lion plush toy for kids and collectors. Made with soft, eco-friendly materials.",
    images: [
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
    ],
    sizes: [],
    rating: 4.8,
    reviews: 85,
    userReviews: [
      { id: 1, user: "Emily Brown", rating: 4.8, comment: "So soft and cute!" },
      { id: 2, user: "Tom Lee", rating: 4.7, comment: "Great for kids!" },
    ],
    relatedProducts: [
      {
        id: "1",
        name: "Zoofari Elephant T-Shirt",
        price: 25.99,
        image: "https://via.placeholder.com/345x300",
      },
      {
        id: "4",
        name: "Zoofari Mug with Animal Print",
        price: 12.99,
        image: "https://via.placeholder.com/345x300",
      },
    ],
  },
  "3": {
    name: "Safari Hat with Giraffe Print",
    price: 15.5,
    description:
      "A stylish safari hat with a giraffe print, perfect for your zoo adventures.",
    images: [
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
    ],
    sizes: ["One Size"],
    rating: 4.2,
    reviews: 45,
    userReviews: [
      {
        id: 1,
        user: "Sarah Davis",
        rating: 4.0,
        comment: "Looks great, good quality!",
      },
      {
        id: 2,
        user: "Alex Turner",
        rating: 4.5,
        comment: "Perfect for safari trips!",
      },
    ],
    relatedProducts: [
      {
        id: "5",
        name: "Elephant Statue",
        price: 45.0,
        image: "https://via.placeholder.com/345x300",
      },
      {
        id: "6",
        name: "Zoofari Keychain",
        price: 8.99,
        image: "https://via.placeholder.com/345x300",
      },
    ],
  },
  "4": {
    name: "Zoofari Mug with Animal Print",
    price: 12.99,
    description:
      "A ceramic mug featuring animal prints, perfect for your morning coffee.",
    images: [
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
    ],
    sizes: [],
    rating: 4.7,
    reviews: 60,
    userReviews: [
      { id: 1, user: "Lisa Ray", rating: 4.5, comment: "Love the design!" },
      { id: 2, user: "Peter Kim", rating: 4.8, comment: "Great gift idea!" },
    ],
    relatedProducts: [
      {
        id: "1",
        name: "Zoofari Elephant T-Shirt",
        price: 25.99,
        image: "https://via.placeholder.com/345x300",
      },
      {
        id: "3",
        name: "Safari Hat with Giraffe Print",
        price: 15.5,
        image: "https://via.placeholder.com/345x300",
      },
    ],
  },
  "5": {
    name: "Elephant Statue",
    price: 45.0,
    description:
      "A handcrafted elephant statue made from eco-friendly materials, perfect for home decor.",
    images: [
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
    ],
    sizes: [],
    rating: 4.9,
    reviews: 150,
    userReviews: [
      {
        id: 1,
        user: "Mary Jones",
        rating: 5.0,
        comment: "Beautiful craftsmanship!",
      },
      {
        id: 2,
        user: "David Lee",
        rating: 4.8,
        comment: "Perfect for my living room!",
      },
    ],
    relatedProducts: [
      {
        id: "1",
        name: "Zoofari Elephant T-Shirt",
        price: 25.99,
        image: "https://via.placeholder.com/345x300",
      },
      {
        id: "2",
        name: "Lion Plush Toy",
        price: 19.99,
        image: "https://via.placeholder.com/345x300",
      },
    ],
  },
  "6": {
    name: "Zoofari Keychain",
    price: 8.99,
    description:
      "A cute keychain with a mini animal figure, perfect for your keys or bag.",
    images: [
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
      "https://via.placeholder.com/500x400",
    ],
    sizes: [],
    rating: 4.3,
    reviews: 30,
    userReviews: [
      { id: 1, user: "Anna White", rating: 4.0, comment: "Cute and sturdy!" },
      { id: 2, user: "James Bond", rating: 4.5, comment: "Nice little gift!" },
    ],
    relatedProducts: [
      {
        id: "4",
        name: "Zoofari Mug with Animal Print",
        price: 12.99,
        image: "https://via.placeholder.com/345x300",
      },
      {
        id: "5",
        name: "Elephant Statue",
        price: 45.0,
        image: "https://via.placeholder.com/345x300",
      },
    ],
  },
};

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);
  const product = productDetails[id as keyof typeof productDetails];
  const [selectedSize, setSelectedSize] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  // Tính tổng số sao dựa trên các đánh giá của người dùng
  useEffect(() => {
    const totalRating =
      product?.userReviews.reduce((acc, review) => acc + review.rating, 0) /
        product?.userReviews.length || product.rating;
    console.log("Average rating:", totalRating); // Có thể dùng để cập nhật state nếu cần
  }, [product]);

  if (!product) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" color="error">
          Product not found
        </Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setCartMessage("Please select a size.");
      return;
    }
    setCartMessage(
      `${product.name} ${
        selectedSize ? `(${selectedSize})` : ""
      } has been added to your cart!`
    );
    // Logic thêm vào giỏ hàng (có thể dùng context hoặc Redux)
  };

  return (
    <Container sx={{ py: 8, maxWidth: "1200px" }}>
      <Grid container spacing={4}>
        {/* Hình ảnh sản phẩm */}
        <Grid item xs={12} md={6}>
          <ProductImageSlider images={product.images} />
        </Grid>

        {/* Thông tin sản phẩm */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, mb: 1, color: "#333" }}
            >
              {product.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.1} />
              <Typography variant="body2" sx={{ ml: 1, color: "#666" }}>
                ({product.reviews} reviews)
              </Typography>
              <Chip
                label="In Stock"
                color="success"
                size="small"
                sx={{ ml: 2, fontWeight: 500 }}
              />
            </Box>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 2, color: "#555", lineHeight: 1.6 }}
            >
              {product.description}
            </Typography>

            {/* Chọn kích thước */}
            {product.sizes.length > 0 && (
              <ProductSizeSelector
                sizes={product.sizes}
                onSizeChange={(size) => setSelectedSize(size)}
              />
            )}

            {/* Nút hành động */}
            <Stack direction="row" spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddToCart}
                sx={{ flex: 1, borderRadius: 2 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<FavoriteBorderIcon />}
                sx={{ flex: 1, borderRadius: 2 }}
              >
                Buy now
              </Button>
            </Stack>

            {/* Thông báo giỏ hàng */}
            {cartMessage && (
              <Typography
                variant="body2"
                color={cartMessage.includes("Please") ? "error" : "success"}
                sx={{ mb: 2 }}
              >
                {cartMessage}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Phần đánh giá của người dùng */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Customer Reviews
        </Typography>
        {product.userReviews.map((review) => (
          <Paper
            key={review.id}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mr: 2 }}>
                {review.user}
              </Typography>
              <Rating value={review.rating} readOnly precision={0.5} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {review.comment}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Sản phẩm liên quan */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          You May Also Like
        </Typography>
        <Grid container spacing={3}>
          {product.relatedProducts.map((relatedProduct) => (
            <Grid item xs={12} sm={6} md={4} key={relatedProduct.id}>
              <ProductCard
                id={relatedProduct.id}
                image={relatedProduct.image}
                name={relatedProduct.name}
                price={relatedProduct.price}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
