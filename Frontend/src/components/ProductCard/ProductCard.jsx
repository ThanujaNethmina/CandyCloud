import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Button } from '@mui/material';
import {defaultImageUrl} from '../../assets/images'
const ProductCard = ({ _id, product_name, value, imageUrl, averageRating,Quantity, onCardClick, handleAddToCart }) => {
  return (
    <Card sx={{
      maxWidth: 345, width: '100%', cursor: 'pointer',
      background: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      borderRadius: "16px",
    } }>
      <CardMedia
        component="img"
        image={imageUrl||defaultImageUrl}
        alt={product_name}
        sx={{
          minWidth: 345,
          maxHeight: 145,
          objectFit: 'cover', // Changed to 'cover' to better fit images
          width: '100%' // Ensures it takes the full width of the card
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price-{value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Quantity-{Quantity}
        </Typography>
        <Rating value={averageRating} readOnly />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleAddToCart(_id);
          }}
          sx={{ marginTop: 2,width:"10rem" }} // Adds some space above the button
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
