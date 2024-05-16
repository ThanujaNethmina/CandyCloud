import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Footer from './Customer Management/Header&Footer/Footer'


const images = [
  {
    url: 'https://www.invoicera.com/blog/wp-content/uploads/2019/01/online-staff-management-software.png',
    title: 'Employee Management',
    width: '23%',
    link: '/employeedash'
  },
  {
    url: 'https://dlvrit.com/blog/wp-content/uploads/dlvrit-customer-relations-blog-1.png',
    title: 'Customer Management',
    width: '23%',
    link: '/dashboard'
  },
  {
    url: 'https://www.bdtask.com/blog/uploads/What-is-eCommerce-shopping-cart-software.png',
    title: 'Shopping Cart Management',
    width: '23%',
  },
  {
    url: 'https://www.invensislearning.com/blog/wp-content/uploads/2021/07/What-is-Supplier-Management-1068x552-1.jpg',
    title: 'Supplier Management',
    width: '23%',
    link: '/suppliertbl'
  },
  {
    url: 'https://www.softwaregroup.com/images/default-source/landing-pages/payment-switch/start-offering-cards.png?sfvrsn=d6a75c7f_2',
    title: 'Order Management and Payment Management',
    width: '23%',
    link: '/ManagePurchases'
  },
  {
    url: 'https://www.plotprojects.com/wp-content/uploads/2023/05/rsz_best_delivery_management_software.jpg',
    title: 'Delivery Management',
    width: '23%',
    link: '/deliveryOrder'
  },
  {
    url: 'https://media.licdn.com/dms/image/C5112AQFtUm5cfLUbfw/article-cover_image-shrink_600_2000/0/1520242889152?e=2147483647&v=beta&t=wp8wjmL5xIYN0TcGgaxELYpDx_IY40n4LUBPJQYUgt0',
    title: 'Financial Management',
    width: '23%',
  },
  {
    url: 'https://media.licdn.com/dms/image/D4D12AQEyPlykFYd61Q/article-cover_image-shrink_720_1280/0/1687283771331?e=2147483647&v=beta&t=AEbZmuFXsbqixy1VX0td2liQfmPkbe9zLVsbaev-bRo',
    title: 'Inventory Management',
    width: '23%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 250,
  margin: theme.spacing(1.8),
  [theme.breakpoints.down('sm')]: {
    width: '50% !important', 
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.7,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
      backgroundColor:'white'
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBaseDemo() {
  return (
    <div>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
            <ImageButton
                focusRipple
                key={image.title}
                style={{
                  width: image.width,
                }}
              >
         <Link key={image.title} to={image.link} style={{ textDecoration: 'none' }}>

          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="white"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
          </Link>
        </ImageButton>

      ))}
    </Box>
    <Footer/>
    </div>
  );
}
