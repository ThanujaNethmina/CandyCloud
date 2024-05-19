import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "./Pink and Brown Flat Illustrative Donuts & Bakery Food Logo (2) (2).png";
import "../components/navbar.css";
import { Img } from "./Img";
import { CloseSVG } from "assets/images";
import { Input } from "postcss";
import { Heading } from "./Heading";
import Modal from "./Modal";


const navButtons = [
  {
    label: "Order Dashboard",
    pages: ["/HomePageOrder"]
  },
  {
    label: "My Order",
    pages: ["/Myorder"],
  },
  {
    label: "Payment",
    pages: ["/Payment"],
  },
  {
    label: "Order and Payment History",
    pages: ["/OrderManagementPage"],
  },
];
const settings = ["Profile", "Dashboard"];


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      className="navBar"
      sx={{ backgroundColor: "#c4c4c47b" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navButtons.map(({ label, pages }) => (
                <MenuItem 
                  key={label} 
                  onClick={handleCloseNavMenu}
                  className="custom-menu-item"
                >
                  <Typography 
                  textAlign="center"
                  >
                    {label}
                    {pages.map((page, index) => (
                      <Link key={index} to={page} className="nav-link">
                        {index === 0 ? "" : ", "}
                        {page}
                      </Link>
                    ))}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img
            src={logo}
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            className="logo"
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Candy Cloud
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navButtons.map(({ label, pages }) => (
              <Button
                key={label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2,
                     color: "white", 
                     display: "block" }}
              >
                <Link to={pages[0]} className="nav-link">
                  {label}
                </Link>
              </Button>
            ))}
          </Box>



          {/*<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            </Box>*/}
            
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
