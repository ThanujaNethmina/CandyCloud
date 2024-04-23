/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Box, Container, Grid, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
  return (
    <Box component="footer" sx={{ border:"1px solid #fff", backgroundColor: 'rgba(255, 218, 221, 0.2)', color: 'black', padding: '2rem 0',marginTop:"5rem" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
                
          {/* Social Section */}
          <Grid item xs={12} md={3} container alignItems="center" direction="column">
            <Box>
              <IconButton href="#" color="inherit"><FacebookIcon /></IconButton>
              <IconButton href="#" color="inherit"><TwitterIcon /></IconButton>
              <IconButton href="#" color="inherit"><InstagramIcon /></IconButton>
            </Box>
            <Typography variant="caption" display="block" sx={{ textAlign: 'center' }}>
              © 2020 Sweet delivery website All rights reserved
            </Typography>
          </Grid>
          {/* Company Section */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6">Company</Typography>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </Grid>
          
          {/* Support Section */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6">Support</Typography>
            <ul>
              <li><a href="#">Help center</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Legal</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </Grid>
          
          {/* Newsletter Section */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6">Stay up to date</Typography>
            <TextField
              variant="outlined"
              placeholder="Your email address"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
    
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
