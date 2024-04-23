import React,{useEffect,useState} from 'react'
import { Grid, Box, Typography } from '@mui/material';
import ProductCard from '../../components/ProductCard/ProductCard';
import Styles from './Home.module.scss'
import {cartService} from '../../services/Cart.Service'
import { toast } from 'react-toastify';
const Home = () => {

  const [products, setProducts] = useState([]);

useEffect(() => {
  handleProductFetch()
}, [])


const handleProductFetch=()=>{
  cartService.GetAllProductsWithRating().then((response)=>{
    console.log(response)
setProducts(response.data)
  }).catch ((error)=>{
    console.log(error)
  })
}




const handleAddToCart=async (id)=>{
  const cartItem=products.find((product)=>product._id===id)
  console.log("cartItem",cartItem)

  const userId =localStorage.getItem("userId")
  try {
const payload={
  userId: userId,
  ProductId: cartItem._id,
  ProductName: cartItem.product_name,
  UnitPrice:cartItem.value,
  Qty: 1,
  TotalPrice:cartItem.value, 
}
   const response= await cartService.addToCartByUseID(payload)
   if(response.status===200){
     console.log(response)
     toast.success("Item added to cart",cartItem._id)
   }
    
  } catch (error) {
    toast.error("Error adding item to cart",cartItem._id)
  }

}

  return (
    <section className={Styles.container}>
    <Box className={Styles.rootBox}>
    <Box className={Styles.titleBox}>
      <Typography variant="h4" component="h1">
        Choose your favorite product
        </Typography>
    </Box>
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard {...product}
           handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
    </Grid>
  </Box>
  </section>
  )
}

export default Home