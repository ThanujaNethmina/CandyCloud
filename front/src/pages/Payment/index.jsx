import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Heading, Img, Button, Text, Input } from "../../components";
import Footer from "../../components/Footer";
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from "pages/CheckoutForm.jsx";
import {loadStripe} from '@stripe/stripe-js';
import usePurchase from "hooks/usePurchase";
import { Link } from "react-router-dom";
import Header from "../../components/navbar"

const stripePromise = loadStripe('pk_test_51P2W1wEXrthFHuX2RbjMqt3XAr67gfmGFOZ7ODZD3zNUHNBLtTOtxKkQTA5CGU9LLAFKRn0fCOZPa6v8UeHhsmi7006W2xIp5w');

export default function PaymentPage() {
  const [searchBarValue1, setSearchBarValue1] = React.useState("");


//to calculations
  const [purchases]=usePurchase();

  console.log(purchases)


  //calculate  the checkout prices
  const purchaseTotal=purchases.reduce((sum,item)=>sum+item.price,0)
  

  const totalPrice=parseFloat(purchaseTotal.toFixed(2));
  //console.log(totalPrice)

  
  return (
    <>
      <Helmet>
        <title>Dasuni's Application2</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col w-full gap-[5px] sm:gap-[5px] bg-gradient1">

       <Header/>


        <div className="flex flex-col w-full gap-[5px] mx-auto md:gap-[79px] md:p-5 sm:gap-[53px] max-w-[1275px] py-1">
          
             {/* <div className="flex flex-col self-stretch items-end">*/}



          <Elements stripe={stripePromise}>
      <CheckoutForm price={totalPrice} purchase={purchases}/>
    </Elements>


   

          </div>
        {/*</div>*/}
        <Footer className="pl-[65px] pr-14 py-[65px] md:p-5 border border-solid white_A700_00_gray_600_00_border bg-gradient2" />
       </div>
    </>
  );
}
