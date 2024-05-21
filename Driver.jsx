import React, { useState } from 'react';
import { Box, Button } from "@mui/material";
import Navbar from './Navbar'; 
import { useNavigate } from "react-router-dom";
import DriverFrom from "./DriverFrom"; 
import DriverTable from "./DriverTable";
import Footer from "../Customer Management/Header&Footer/Footer";

const Driver = () => {
    const [isFormOpen, setIsFormOpen] = useState(false); // State to manage form visibility
    const [drivers, setDrivers] = useState([]); // State to manage deliveries
    const navigate = useNavigate(); // Initialize the navigate function

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const addDriver = (newDriver) => {
        setDrivers([...drivers, newDriver]);
    };

    const handleAddDriverClick = () => {
        toggleForm(); // Toggle form visibility
        navigate('/drivers-from');// Navigate to the DeliveryForm component route
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
                onClick={handleAddDriverClick}
                sx={{ backgroundColor: '#ff69b4', color: 'white', '&:hover': { backgroundColor: '#ff69b4' } }}
            >
                Add Driver
            </Button> {/* Button to toggle form visibility */}
            {isFormOpen && <DriverFrom addDriver={addDriver} toggleForm={toggleForm} />} {/* Render form if isFormOpen is true */}
            <DriverTable drivers={drivers} />
            <Footer/>
        </Box>
    );
}

export default Driver;
