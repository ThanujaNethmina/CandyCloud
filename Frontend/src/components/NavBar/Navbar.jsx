import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {logo } from '../../assets/images';
import {APP_ROUTES} from '../../utilities/routes.constants';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const settings = ["Profile","Shipping Address"];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // Vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Shipping Address') {
      navigate(APP_ROUTES.SHIPPING_ADDRESS);
    }
    // Add logic for 'Profile View' if needed
  };
  const isRouteActive = (route) => {
    return location.pathname === route;
  };

   // Define your pages using APP_ROUTES
   const pages = [
    { name: 'Home', route: APP_ROUTES.ROOT },
    { name: 'Customer Support', route: APP_ROUTES.CUSTOMER_SUPPORT },
    { name: 'About Us', route: APP_ROUTES.ABOUT_US }, // Add the rest of your routes here
  ];  

  return (
    <AppBar position="static" sx={{ 
        marginBottom: '20px',
        background: 'transparent', 
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.2)', // Added shadow
        borderBottom: '1px solid rgba(255, 255, 255, 0.5)', // Added border
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            {/* Logo */}
            <img src={logo} alt="logo" style={{ width: '100px' }} />
              {/* Search Box */}
              <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search here…"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>  
          </Box>
          <>
              {/* Nav Items */}
              {pages.map(({ name, route }) => (
              <Typography
                key={name}
                variant="h6"
                onClick={() => navigate(route)}
                sx={{ 
                  margin: '0 10px', 
                  cursor: 'pointer', 
                  fontWeight: isRouteActive(route) ? 700 : 400, // Bold for active route
                  color: isRouteActive(route) ? 'secondary.main' : 'inherit',
                }}
              >
                {name}
              </Typography>
            ))}
          </>
         
          {/* Shopping Cart and Avatar */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            
            <IconButton size="large" aria-label="show cart items" color="inherit" >
              <ShoppingCartIcon  onClick={()=>{navigate(APP_ROUTES.SHOPPING_CART)}} />
            </IconButton>
            <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={() => handleCloseUserMenu('')}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
