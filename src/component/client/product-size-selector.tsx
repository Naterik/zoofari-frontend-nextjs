// components/client/product-size-selector.tsx
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

interface ProductSizeSelectorProps {
  sizes: string[];
  onSizeChange: (size: string) => void;
}

const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({
  sizes,
  onSizeChange,
}) => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const size = event.target.value as string;
    setSelectedSize(size);
    onSizeChange(size);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        Select Size
      </Typography>
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel>Size</InputLabel>
        <Select
          value={selectedSize}
          onChange={handleChange}
          label="Size"
          sx={{ borderRadius: 2 }}
        >
          {sizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductSizeSelector;
