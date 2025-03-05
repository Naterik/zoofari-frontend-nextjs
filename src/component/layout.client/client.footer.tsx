"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7))",
        color: "white",
        py: 6,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none", // Loại bỏ gạch chân
              }}
            >
              Zoofari
            </Typography>
            <Typography
              variant="body2"
              sx={{ textDecoration: "none", color: "white" }}
            >
              Khám phá thế giới động vật với những thông tin chi tiết và hình
              ảnh sống động.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "white", // Làm nổi bật tiêu đề
                textDecoration: "none",
              }}
            >
              Thông tin
            </Typography>
            <Box component="nav">
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ textDecoration: "none" }}
              >
                Giới thiệu
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ textDecoration: "none" }}
              >
                Động vật nổi bật
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ textDecoration: "none" }}
              >
                Blog
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ textDecoration: "none" }}
              >
                Liên hệ
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "white", // Làm nổi bật tiêu đề
                textDecoration: "none",
              }}
            >
              Hỗ trợ & Điều khoản
            </Typography>
            <Box component="nav">
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ textDecoration: "none" }}
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ textDecoration: "none" }}
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ textDecoration: "none" }}
              >
                Hỗ trợ khách hàng
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ textDecoration: "none" }}
              >
                FAQ
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "white", // Làm nổi bật tiêu đề
                textDecoration: "none",
              }}
            >
              Theo dõi chúng tôi
            </Typography>
            <Box>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="#" color="inherit">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box
          textAlign="center"
          mt={4}
          pt={2}
          borderTop={1}
          borderColor="rgba(255, 255, 255, 0.5)"
        >
          <Typography
            variant="body2"
            sx={{ textDecoration: "none", color: "white" }}
          >
            &copy; {new Date().getFullYear()} Zoofari. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
