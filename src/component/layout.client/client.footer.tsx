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
import React from "react";
import { usePathname } from "next/navigation";

export default function AppFooter() {
  const pathname = usePathname();
  const [hoveredService, setHoveredService] = React.useState(false);
  const isActive = (path: string) => pathname === path;

  const buttonStyles = {
    my: 2,
    color: "white",
    display: "block",
    "&:hover": {
      color: "#2EB872",
    },
  };
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7))",
        color: "white",
        py: 6,
        mt: 4,
        fontFamily: "Roboto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                mr: 2,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#2EB872",
                textDecoration: "none",
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
                color: "white",
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
                sx={{
                  ...buttonStyles,
                  textDecoration: "none",
                }}
              >
                Giới thiệu
              </Link>
              <Link
                href="/animal"
                display="block"
                sx={{
                  ...buttonStyles,
                  textDecoration: "none",
                }}
              >
                Động vật nổi bật
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ ...buttonStyles, textDecoration: "none" }}
              >
                Blog
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ ...buttonStyles, textDecoration: "none" }}
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
                sx={{ ...buttonStyles, textDecoration: "none" }}
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ ...buttonStyles, textDecoration: "none" }}
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ ...buttonStyles, textDecoration: "none" }}
              >
                Hỗ trợ khách hàng
              </Link>
              <Link
                href="#"
                color="inherit"
                display="block"
                sx={{ ...buttonStyles, textDecoration: "none" }}
              >
                FAQ
              </Link>
            </Box>
          </Grid>

          <Grid item xs={10} sm={2} md={3}>
            <Typography
              variant="h6"
              // gutterBottom
              sx={{
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
              }}
            >
              Theo dõi chúng tôi
            </Typography>
            <div
              style={{ display: "flex", position: "relative" }}
              onMouseEnter={() => setHoveredService(true)}
              onMouseLeave={() => setHoveredService(false)}
            >
              <Box>
                <IconButton href="#" color="inherit">
                  <Facebook sx={{ ...buttonStyles }} />
                </IconButton>
                <IconButton href="#" color="inherit">
                  <Twitter sx={{ ...buttonStyles }} />
                </IconButton>
                <IconButton href="#" color="inherit">
                  <Instagram sx={{ ...buttonStyles }} />
                </IconButton>
                <IconButton href="#" color="inherit">
                  <YouTube sx={{ ...buttonStyles }} />
                </IconButton>
              </Box>
            </div>
          </Grid>
        </Grid>
        <Box
          textAlign="center"
          mt={2}
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
