"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { usePathname } from "next/navigation";
// import { useCart } from "../../hooks/useCart"; // Adjust the path based on your project structure

function AppHeader() {
  const pathname = usePathname();
  // const { getCartCount } = useCart(); // Sử dụng useCart để lấy số lượng giỏ hàng

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [hoveredService, setHoveredService] = React.useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isActive = (path: string) => pathname === path;

  const buttonStyles = {
    my: 2,
    color: "black",
    display: "block",
    "&:hover": {
      color: "#2EB872",
    },
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        top: 0,
        zIndex: 1100,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            variant="h4"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#2EB872",
              textDecoration: "none",
              "&:hover": {
                color: "#1F8A5A",
              },
            }}
          >
            Zoofari
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Button
              sx={{
                ...buttonStyles,
                color: isActive("/about") ? "#2EB872" : "black",
              }}
            >
              <Link
                href="/about"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Giới thiệu
              </Link>
            </Button>
            <div
              style={{ display: "flex", position: "relative" }}
              onMouseEnter={() => setHoveredService(true)}
              onMouseLeave={() => setHoveredService(false)}
            >
              <Button
                sx={{
                  ...buttonStyles,
                  color:
                    isActive("/services") ||
                    isActive("/product") ||
                    isActive("/ticket")
                      ? "#2EB872"
                      : "black",
                }}
              >
                Dịch vụ
              </Button>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ArrowDropDownIcon sx={{ color: "black", marginLeft: "5px" }} />
              </div>
              {hoveredService && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "68px",
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "4px",
                    zIndex: 10,
                    minWidth: "150px",
                  }}
                >
                  <MenuItem
                    sx={{ color: "black", "&:hover": { color: "#2EB872" } }}
                  >
                    <Link
                      href="/product"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Đồ lưu niệm
                    </Link>
                  </MenuItem>
                  <MenuItem
                    sx={{ color: "black", "&:hover": { color: "#2EB872" } }}
                  >
                    <Link
                      href="/ticket"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Mua vé
                    </Link>
                  </MenuItem>
                </Box>
              )}
            </div>
            <Button
              sx={{
                ...buttonStyles,
                color: isActive("/animals") ? "#2EB872" : "black",
              }}
            >
              <Link
                href="/animals"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Động vật
              </Link>
            </Button>
          </Box>
          <Button
            sx={{
              ...buttonStyles,
              color: isActive("/event") ? "#2EB872" : "black",
            }}
          >
            <Link
              href="/event"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Sự kiện
            </Link>
          </Button>

          {/* User và Cart menu */}
          <Box
            sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}
          >
            {/* Cart Icon */}
            <Tooltip title="Giỏ hàng">
              <IconButton component={Link} href="/cart" sx={{ p: 1 }}>
                <ShoppingCartIcon sx={{ color: "#2EB872", fontSize: 30 }} />
                {/* {getCartCount() > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "#FF9800",
                      color: "white",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    {getCartCount()}
                  </Box>
                )} */}
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Tooltip title="Mở cài đặt">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>Hồ sơ</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppHeader;
