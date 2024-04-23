import React, { useState ,useEffect} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartStep from '../../components/ShoppingCartStep/ShoppingCartStep';
import PaymentDetailsStep from '../../components/PaymentDetails/PaymentDetails';
import Styles from './ShoppingCart.module.scss';
import { CART_ACTIONS, cartItems } from '../../utilities/index';
import ShippingDetailsFrom from '../../components/ShippingDetailsFrom/ShippingDetailsFrom';
import { sampleShippingData } from '../../utilities/data.constants';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import { Grid } from '@mui/material';
import { cartService } from '../../services/Cart.Service';  
import { toast } from 'react-toastify';
const ShoppingCart = () => {

  const SHIPPING_FORM_INITIAL_STATE = {
     _id:{ value: "", isRequired: true, disable: false, readonly: true, validator: "text", error: "", },
    fullName: { value: "", isRequired: true, disable: false, readonly: true, validator: "text", error: "", },
    email: { value: "", isRequired: true, disable: false, readonly: true, validator: "email", error: "", },
    addressLine1: { value: "", isRequired: true, disable: false, readonly: true, validator: "text", error: "", },
    addressLine2: { value: "", isRequired: false, disable: false, readonly: true, validator: "text", error: "", },
    city: { value: "", isRequired: true, disable: false, readonly: true, validator: "text", error: "", },
    postalCode: { value: "", isRequired: true, disable: false, readonly: true, validator: "text", error: "", },
    country: { value: "", isRequired: true, disable: false, readonly: true, validator: "text", error: "", },
    phoneNumber: { value: "", isRequired: true, disable: false, readonly: true, validator: "text", error: "", },
  };
  const INITIAL_SORT_META = {
    field: "",
    asc: true,
  }
  const [shippingDataForm, setShippingDataForm] = useState(SHIPPING_FORM_INITIAL_STATE);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [cartItemList, setCartItemsList] = useState([]);
  const [allShippingDetails, setAllShippingDetails] = useState([]);
  const [selectedDetailId, setSelectedDetailId] = useState('');
  const [helperText, setHelperText] = useState(true);

 // Fetching shipping data from the API
 useEffect(() => {


  fetchShippingData();
}, []);

 const fetchShippingData=async()=> {
  // need set user id from local storage
  const userID ="66194666a02984b0db969e2f"
  localStorage.getItem("userID")
  try {
    const shippingDetailsResponse = await cartService.GetAllShippingDetailsByUserID(userID);
    setAllShippingDetails(shippingDetailsResponse.data);
    const cartItemsResponse = await cartService.ViewAllCartItemsByUserID(userID);
    setCartItemsList(cartItemsResponse.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Optionally update state to show error to user
  }

}

  const handleNext = () => {
    const newCompleted = { ...completed, [activeStep]: true };
    setCompleted(newCompleted);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const onUpdateCart = async (itemId, Item,mode) => {
    if(mode ===CART_ACTIONS.REMOVE){

      try {
      const remove= await cartService.RemoveItemFromCart(itemId)
      if(remove.status===200){
        toast.success("Item Removed from Cart Successfully")
        fetchShippingData() 
      }
    }catch (error) {
        toast.error("Error in Removing from Cart Item")
        console.error('Error fetching data:', error);
      }
      
    }

    if(mode===CART_ACTIONS.INCREASE){
      console.log("mode",mode,CART_ACTIONS.INCREASE)
      try {
        console.log("first",Item)
        const increase= await cartService.CartIncrementByUseID(Item)
        if(increase.status===200){
          toast.success("Item Increased in Cart Successfully")
          fetchShippingData() 
        }
      }catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Error in Increasing Cart Item")
      }
    
    }
    
    if(mode===CART_ACTIONS.DECREASE){
      try {
        console.log("first",Item)
        const increase= await cartService.CartDecrementByUseID(Item)
        if(increase.status===200){
          toast.success("Item Decreasing in Cart Successfully")
          fetchShippingData() 
        }
      }catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Error in Decreasing Cart Item")
      }
    }
  };


  const handleInputFocus = (field, type) => {
    if (type === "GI")
    setShippingDataForm({
  ...shippingDataForm,
  [field]: {
    ...shippingDataForm,
    error: null,
  },
});

  };

  const onInputHandleChange = (field, value) => {
    setHelperText(true);
console.log("field",field,value)
    if(field==="email"){
      setShippingDataForm({
         ...shippingDataForm,
         email: {
           ...shippingDataForm.email,
           value: value,
         },
       });
     }
     if(field==="fullName"){
      setShippingDataForm({
         ...shippingDataForm,
         fullName: {
           ...shippingDataForm.fullName,
           value: value,
         },
       });
     }
     if(field==="addressLine1"){
      setShippingDataForm({
         ...shippingDataForm,
         addressLine1: {
           ...shippingDataForm.addressLine1,
           value: value,
         },
       });
     }
     if(field==="addressLine2"){
      setShippingDataForm({
         ...shippingDataForm,
         addressLine2: {
           ...shippingDataForm.addressLine2,
           value: value,
         },
       });
     }
     if(field==="city"){
      setShippingDataForm({
         ...shippingDataForm,
         city: {
           ...shippingDataForm.city,
           value: value,
         },
       });
     }
     if(field==="postalCode"){
      setShippingDataForm({
         ...shippingDataForm,
         postalCode: {
           ...shippingDataForm.postalCode,
           value: value,
         },
       });
     }
     if(field==="country"){
      setShippingDataForm({
         ...shippingDataForm,
         country: {
           ...shippingDataForm.country,
           value: value,
         },
       });
     }
     if(field==="phoneNumber"){
      setShippingDataForm({
         ...shippingDataForm,
         phoneNumber: {
           ...shippingDataForm.phoneNumber,
           value: value,
         },
       });
     }
     if(field==="email"){
      setShippingDataForm({
         ...shippingDataForm,
         email: {
           ...shippingDataForm.email,
           value: value,
         },
       });
     }
     
}


  const steps = [
    { label: 'Shopping Cart', component: <ShoppingCartStep cartItemList={cartItemList} onUpdateCart={onUpdateCart} /> },
    { label: 'Shipping Info', component: <ShippingDetailsFrom shippingData={shippingDataForm} isCart={true}onInputHandleChange={onInputHandleChange} handleInputFocus={handleInputFocus} /> },
    { label: 'Payment Details', component: <PaymentDetailsStep /> },
  ];

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();



  const setShippingDataFromDetail  = (detail) => {
    setShippingDataForm({
      ...SHIPPING_FORM_INITIAL_STATE,
      fullName: { ...SHIPPING_FORM_INITIAL_STATE.fullName, value: detail.fullName },
      email: { ...SHIPPING_FORM_INITIAL_STATE.email, value: detail.email },
      addressLine1: { ...SHIPPING_FORM_INITIAL_STATE.addressLine1, value: detail.addressLine1 },
      addressLine2: { ...SHIPPING_FORM_INITIAL_STATE.addressLine2, value: detail.addressLine2 },
      city: { ...SHIPPING_FORM_INITIAL_STATE.city, value: detail.city },
      postalCode: { ...SHIPPING_FORM_INITIAL_STATE.postalCode, value: detail.postalCode },
      country: { ...SHIPPING_FORM_INITIAL_STATE.country, value: detail.country },
      phoneNumber: { ...SHIPPING_FORM_INITIAL_STATE.phoneNumber, value: detail.phoneNumber },
    });
  };

  const handleRadioChange = async (event) => {

     const selectedDetail = allShippingDetails.find(detail => detail._id === event.target.value);
    setSelectedDetailId(event.target.value);
    setShippingDataFromDetail(selectedDetail);
   const userId=localStorage.getItem("userId")
const payload={
  userId:userId,
  shippingId: selectedDetail._id}

try {
   const response=  await cartService.UpdateCartShippingIDByByUserId(payload)

   response.status===200 && toast.success("Shipping Details Updated Successfully")
} catch (error) {
  
}

  };

  return (
    <section className={`${Styles.Container} ${activeStep === 1 ? 'centerContent' : ''}`}>
 
      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
        {steps.map(step => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 1 && (
        <FormControl component="fieldset" sx={{ width: '100%', marginBlock: "1rem"  , marginLeft:"3rem" }}>
          <FormLabel component="legend" sx={{ textAlign: 'left', }}>Shipping Information</FormLabel>
          <RadioGroup aria-label="shipping-detail" name="shipping-detail" value={selectedDetailId} onChange={handleRadioChange} sx={{ alignItems: 'flex-start',marginBlock:"1rem" }}>
            <Grid container spacing={2}>
              {allShippingDetails.map((detail, index) => (
                <Grid item xs={2} key={detail._id} display="flex">
                  <FormControlLabel value={detail._id.toString()} control={<Radio />} label={`Shipping Option ${index + 1}`} sx={{ marginLeft: 0 }} />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      )}

      <div>
        {activeStep === totalSteps() ? (
          <div>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
          {activeStep === 1 ? (
             <div style={{ width: '100%', textAlign: 'center' }}>
             <Grid Container spacing={2} >
              <Typography>{steps[activeStep].component}</Typography>
              </Grid>
            </div>
          ) : (
            <Typography>{steps[activeStep].component}</Typography>
          )}
            <div className={Styles.ButtonGroup}>
              <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {isLastStep() ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShoppingCart;
