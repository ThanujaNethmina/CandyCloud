import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import { APP_ROUTES } from "../utilities/routes.constants";
import { Home ,Shipping,ShoppingCart} from '../pages';
import ResponsiveAppBar from '../components/NavBar/Navbar';
import FaqPage from '../components/Footer/Footer';
import { Box } from '@mui/material';
 const UserRoutes = ({ children }) => (
 <>
    <ResponsiveAppBar/> 
    {children}
    <Box sx={{marginTop:"5rem"}}>
    <FaqPage/>
    </Box>
  </>
 );
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

      <Route path={APP_ROUTES.ROOT} element={<UserRoutes><Home /></UserRoutes>} />

      <Route path={APP_ROUTES.SHIPPING_ADDRESS} element={<UserRoutes><Shipping /></UserRoutes>} />
      <Route path={APP_ROUTES.SHOPPING_CART} element={<UserRoutes><ShoppingCart /></UserRoutes>} />
      {/* <Route path={APP_ROUTES.View_FAQ} element={<UserRoutes><FaqPage /></UserRoutes>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes