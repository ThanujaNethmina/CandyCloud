import React, { useState } from 'react';
import { Box, Button } from "@mui/material";
import Navbar from './Navbar'; 
import DeliveryForm from "./DeliveryFrom"; 
import DeliveryTable from "./DeliveryTable";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from "../Customer Management/Header&Footer/Footer"

const Delivery = () => {
    const [isFormOpen, setIsFormOpen] = useState(false); // State to manage form visibility
    const [deliveries, setDeliveries] = useState([]); // State to manage deliveries
    const navigate = useNavigate(); // Initialize the navigate function

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const addDelivery = (newDelivery) => {
        setDeliveries([...deliveries, newDelivery]);
    };

    const handleAddDeliveryClick = () => {
        toggleForm(); // Toggle form visibility
        navigate('/delivery-form'); // Navigate to the DeliveryForm component route
    };

    return (
        <Box
            sx={{
                width: 'calc(100%)',
                margin: 'auto',
                backgroundColor: 'pink',
                
            }}
        >   
            <Navbar />
            <Button 
                onClick={handleAddDeliveryClick}
                sx={{ backgroundColor: '#ff69b4', color: 'white', '&:hover': { backgroundColor: '#ff69b4' } }}
            >
                Add Delivery
            </Button> {/* Button to toggle form visibility */}
            {isFormOpen && <DeliveryForm addDelivery={addDelivery} toggleForm={toggleForm} />} {/* Render form if isFormOpen is true */}
            <DeliveryTable deliveries={deliveries} />
            <Footer/>
        </Box>
    );
}

export default Delivery;
