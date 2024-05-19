import React, { useEffect, useState } from "react";
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import { FaPaypal } from "react-icons/fa";
import useAuth from "hooks/useAuth";
import useAxiosSecure from "hooks/useAxiosSecure";
//import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';


const CheckoutForm=({price,purchase})=>{
    const stripe = useStripe();
    const elements = useElements();
    const {user}=useAuth()//in confirm payment this is want
    const axiosSecure=useAxiosSecure()
    const navigate=useNavigate()

    const [cardError,setCardError]=useState('')
    const [clientSecret, setClientSecret] = useState("");
    

    //validate - price cannot be instead of number or <1 value or string or something
    useEffect(()=>{
        if(typeof price!=='number'||price<1){
            console.log("price is not a number or less than 1")
            return;
        }
        //frontend also connects with payment intents
        axiosSecure.post('/create-payment-intent',{price})
        .then(res=>{
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
    },[price,axiosSecure])

    // handleSubmit function to form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {  // validation: if invalid api key stripe not working
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
          }


        //create bank card element
        const card = elements.getElement(CardElement);

        if (card == null) {//if card is not available
        return;
        }


        // Create payment method
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          
          // Handle card creation error - validation: if card details are invalid
          if (error) {
            console.log('[error]', error);//if card any details invalid display this errr--> that msg display after pay btn
            setCardError(error.message)//pass above line error
          } else {
            setCardError("success payment!")//if no errors,directly displays this
          }


          //confirm the payment
          const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName||'anonymous',
                  email:user?.email||'unknown'
                },
              },
            },
          );

          // Handle payment confirmation error
          if(confirmError){
            console.log(confirmError);
          }else if(paymentIntent){
            console.log(paymentIntent)
          
           if(paymentIntent.status==="succeeded"){//handle sucessfull payment with using payment intents in stripe
                  
                  console.log(paymentIntent.id) //if payment intent status==suceeded, can get generated transaction id
                  setCardError(<p className="font-semibold" 
                    style={{ color: 'blue', fontSize: '20px',whiteSpace: 'nowrap',fontStyle: 'normal' }}>
                      Transaction Id : {paymentIntent.id}</p>);//if payment intent status==suceeded, can generated transaction id display
                  
                  //save all payment information--> to get and display in order history page in future==> now save to that purpose
                  const paymentInfo={
                      email:user.email,
                      transitionId:paymentIntent.id,
                      price,
                      quantity:purchase.length,
                      status:"Order Pending",
                      itemName:purchase.map(item=>item.name),
                      purchaseItems:purchase.map(item=>item.id),
                      productItems:purchase.map(item=>item._id)
                  }

                  console.log(paymentInfo)

                  //send all payment information to the backend-at first we do this frontend part(backend also wants)
                  
                  axiosSecure.post('/payments',paymentInfo)
                  .then(res=>{
                      console.log(res.data)
                      alert("Payment successfull!")
                      navigate('/OrderManagementPage')
                  })

        }
      }
    };
    return(
        <div className="my-12 flex flex-col md:flex-row justify-between items-start">
            <div className="flex">
            {/*left side*/}
            
            <div className="w-full w-1/2 px-4 space-y-3 ml-auto mr-80">
            <div className="border rounded-md p-7  bg-gradient3 rounded-[16px]" >
            <h4 className="font-semibold" style={{ color: '#852D6B', fontSize: '37px', whiteSpace: 'nowrap' ,marginBottom:'30px'}}>Order Summary</h4>
            <p style={{ fontSize: '20px', whiteSpace: 'nowrap' ,marginBottom:'10px'}}>Total Price : {price.toFixed(2)}</p>
            <p style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Number of Items : {purchase.length}</p>
            </div>
            </div>
            {/*right side*/}

            {/*payment form border*/}
            <div className="w-full w-1/2 px-4 space-y-6 ml-auto card shrink-0 w-full max-w-xl shadow-2xl bg-base-300 px-4 py-7">

            <h4 className="font-semibold" style={{ color: '#852D6B', fontSize: '37px', whiteSpace: 'nowrap', marginBottom: '40px' }}>Process Your Payment</h4>
          


  {/* Stripe Form*/}
  <form onSubmit={handleSubmit}>

          {/* CardElement component uses to enter users credit card information securely*/}  
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="cardNumber" className="font-semibold" style={{ fontSize: '18px' ,marginRight: '200px' }}>Card Number</label>
        <label htmlFor="expiryDate" className="font-semibold" style={{ fontSize: '18px' ,marginRight: '20px' }}>Expiry Date</label>
        <label htmlFor="cvc" className="font-semibold" style={{ fontSize: '18px' ,marginRight: '20px' }}>CVC</label>
        <label htmlFor="cvc" className="font-semibold" style={{ fontSize: '18px' }}>Zip</label>
      </div>
      <div className="border rounded-md p-7  bg-gradient3 rounded-[16px]" style={{ marginBottom: '40px' }}>
       {<CardElement
        options={{
          style: {
            base: {
              fontSize: '22px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />}
      </div>

      {/*checkbox validation*/}
        <div className="flex sm:flex-col w-[69%] md:w-full mt-[30px] gap-[17px] items-center" style={{ marginLeft:'25px' }}>
        <input type="checkbox" id="termsCheckbox" name="termsCheckbox" required />
        <label for="termsCheckbox" className="self-end text-black-900 font-normal whitespace-nowrap">I have read and accepted all terms and conditions</label>
        </div>


        {/*Pay btn*/}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button type="submit" disabled={!stripe} className="mb-3" style={{ fontSize: '30px', marginTop: '30px', backgroundColor: '#852D6B', color: 'white', padding: '18px 220px', borderRadius: '15px', border: 'none', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#852D6B'}>
        Pay
    </button>
    </div>
  </form>

          {/*if card num/card details is invalid display this error automatically generates using stripe--> line 60 error display msg*/}
            {
                cardError?<p className="font-semibold" style={{ color: '#FF0000' ,fontSize:'18px',fontStyle: 'italic'}}>{cardError}</p> : ""
            }

            {/*PayPal option*/}
            <div className="mt-5 text-center">
                <hr />
                <div className="flex justify-center items-center">

                <button type="submit" className="mb-2 mr-2 flex items-center" style={{ fontSize: '20px', marginTop: '60px', backgroundColor: '#A9A9A9', color: 'white', padding: '8px 50px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }} 
                onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'} 
                onMouseOut={(e) => e.target.style.backgroundColor = '#A9A9A9'}>
    <FaPaypal style={{ marginRight: '10px' }} /> Pay with Paypal
    </button>
    </div>
    {/*Cash on delivery option*/}
    <div className="flex justify-center items-center">

                <button type="submit" className="mb-2 flex items-center" style={{ fontSize: '20px', marginTop: '20px', backgroundColor: '#A9A9A9', color: 'white', padding: '8px 50px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }} 
                onMouseOver={(e) => e.target.style.backgroundColor = '#FF6289'} 
                onMouseOut={(e) => e.target.style.backgroundColor = '#A9A9A9'}>
                Cash On Delivery
                </button>
</div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default CheckoutForm