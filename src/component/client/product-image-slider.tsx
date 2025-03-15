// components/client/product-image-slider.tsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

interface ProductImageSliderProps {
  images: string[];
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i: number) => (
      <Box
        sx={{
          mt: 1,
          width: 60,
          height: 60,
          backgroundImage: `url(${images[i]})`,
          backgroundSize: "cover",
          borderRadius: 1,
          border: "1px solid #e0e0e0",
          "&:hover": { borderColor: "primary.main" },
        }}
      />
    ),
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <img
              src={image}
              alt={`Product Image ${index + 1}`}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductImageSlider;
