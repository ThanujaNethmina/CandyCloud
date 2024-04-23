import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, IconButton, Typography, Divider,Grid, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Style from './ShoppingCartStep.module.scss';
import { TableContainer, Paper, Table, TableHead, TableCell,TableRow, TableBody, Tooltip,TablePagination} from '@mui/material';
import {defaultImageUrl} from '../../assets/images'
import {CART_ACTIONS} from '../../utilities/app.constants'
const ShoppingCartStep = ({ cartItemList, onUpdateCart }) => {

  console.log(cartItemList)
  const handleRemoveItem = (id) => {
    onUpdateCart(id, null,CART_ACTIONS.REMOVE);
  };

  const handleIncreaseQuantity = (item) => {
    console.log("item Increase",item)
    onUpdateCart(item._id, item, CART_ACTIONS.INCREASE);
  };

  const handleDecreaseQuantity = (item) => {
    onUpdateCart(item._id, item, CART_ACTIONS.DECREASE);
  };

  // Calculate shipping cost for an individual item
  const calculateIndividualShipping = (item) => {
    const itemTotalPrice = item.UnitPrice * item.Qty;
    if (itemTotalPrice >= 500) {
      return 0;
    }
    return itemTotalPrice * 0.1; // 10% shipping cost if the item total is below $50
  };

  // Calculate the total shipping cost for all items
  const calculateTotalShipping = () => {
    return cartItemList.reduce((total, item) => total + calculateIndividualShipping(item), 0);
  };

  // Calculate the subtotal (price * quantity) for all items
  const calculateSubtotal = () => {
    return cartItemList.reduce((total, item) => total + item.UnitPrice.toFixed(2) * item.Qty, 0);
  };

  const subtotal = calculateSubtotal();
  const totalShipping = calculateTotalShipping();
  const estimatedTotal = subtotal + totalShipping;

  return (
    <section className={Style.shoppingStepContainer}>
      <section className={Style.Section1}>
      {cartItemList.length === 0 ? (
      <p>Cart is Empty</p>
  ) : (
        <List>

          {cartItemList.map(item => (
            <ListItem key={item._id} secondaryAction={
              <>
                <IconButton onClick={() => handleDecreaseQuantity(item)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <IconButton onClick={() => handleIncreaseQuantity(item)}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <Button onClick={() => handleRemoveItem(item._id)}>Remove</Button>
              </>
            }>
              <ListItemAvatar>
                <Avatar src={item.imageUrl||defaultImageUrl} alt={item.ProductName} />
              </ListItemAvatar>
              <ListItemText
                primary={item.ProductName}
                secondary={`Price: Rs.${item.UnitPrice.toFixed(2)} - Quantity: ${item.Qty}`}
              />
            </ListItem>
          ))}
        </List>
          )}
      </section>
      
      <section className={Style.Section2}>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={12}>
      <div className={Style.detailedReport}>
        <Typography variant="h6" component="h2">Detailed Shipping Report</Typography>
        <Grid container spacing={4}>
          {cartItemList.map(item => (
            <Grid item xs={6} md={12} key={item._id}>
              <Typography>
                {item.ProductName}:{calculateIndividualShipping(item) === 0 ? 'Free Shipping' : `Rs.${calculateIndividualShipping(item)} Shipping`}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </div>
    </Grid>
    <Grid item xs={12} sm={12}>
      <Divider />
      <div className={Style.Summary}>
        <Typography sx={{justifyContent:"center",fontSize:"24px", textAlign:"center"}}>Summary</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Subtotal:</TableCell>
                <TableCell>Rs.{subtotal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Shipping Cost:</TableCell>
                <TableCell>Rs.{totalShipping}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estimated Total:</TableCell>
                <TableCell>Rs.{estimatedTotal}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Grid>
  </Grid>
</section>


    </section>
  );
};

export default ShoppingCartStep;
