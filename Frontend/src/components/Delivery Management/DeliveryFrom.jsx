import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, MenuItem, Select } from '@mui/material';
import Navbar from './Navbar'; 
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Footer from "../Customer Management/Header&Footer/Footer";
import './DeliveryForm.css';

const DeliveryForm = () => {
    const [deliveryData, setDeliveryData] = useState({
        itemId: '',
        customerAddress: '',
        customerEmail: '',
        trackingCode: '',
        name: '',
        vehicleType: '',
        vehicleNumber: '',
        currentLocation: 'Malabe', // Set the default value to 'Malabe'
    });
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/drivers');
                setDrivers(response.data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };
        fetchDrivers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Validation regex allowing only letters, numbers, and spaces
        const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;

        // If the value contains symbols, remove them
        if (!alphanumericRegex.test(value)) {
            sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
        }

        setDeliveryData((prevState) => ({
            ...prevState,
            [name]: sanitizedValue,
        }));

        if (name === 'customerEmail') {
            if (!validateEmail(value)) {
                setEmailError('Please enter a valid email address.');
            } else {
                setEmailError('');
            }
        }

        if (name === 'customerAddress') {
            if (!validateAddress(value)) {
                setAddressError('Customer address must start with a letter or a number.');
            } else {
                setAddressError('');
            }
        }
    };

    const handleDriverSelect = (driverName) => {
        setSelectedDriver(driverName);
        const selectedDriverData = drivers.find((driver) => driver.name === driverName);
        setDeliveryData({
            ...deliveryData,
            name: selectedDriverData.name,
            vehicleType: selectedDriverData.type,
            vehicleNumber: selectedDriverData.number,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/deliveries', deliveryData)
            .then(() => {
                setDeliveryData({
                    itemId: '',
                    customerAddress: '',
                    customerEmail: '',
                    trackingCode: '',
                    name: '',
                    vehicleType: '',
                    vehicleNumber: '',
                    currentLocation: 'Malabe', // Set the current location to 'Malabe' after submission
                });
                alert('Data successfully added to the database!');
            })
            .catch((error) => {
                console.error('Error adding data to the database:', error);
                alert('Failed to add data to the database. Please try again.');
            });
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };
    
    
    
    const validateAddress = (address) => {
        const firstChar = address.charAt(0);
        const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;
        return alphanumericRegex.test(firstChar);
    };

    return (
        <div>
            <Navbar/>
            <h1>Assign Delivery Form</h1>
            <div className="all">
            <form onSubmit={handleSubmit} className="horizontal-form">
            <div className="form-container">
            <div className="form-column">
                <div className="form-group">
                    <label htmlFor="itemId">Item ID:</label>
                    <input
                        type="text"
                        id="itemId"
                        name="itemId"
                        required
                        onChange={handleChange}
                        value={deliveryData.itemId}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customerAddress">Customer Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="customerAddress"
                        required
                        onChange={handleChange}
                        value={deliveryData.customerAddress}
                    />
                    {addressError && <p className="error-message">{addressError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="trackingCode">Tracking Code:</label>
                    <input
                        type="text"
                        id="trackingCode"
                        name="trackingCode"
                        onChange={handleChange}
                        value={deliveryData.trackingCode}
                    />
                </div>
            
            
                <div className="form-group">
                    <label htmlFor="currentLocation">Current Location:</label>
                    <input
                        type="text"
                        id="currentLocation"
                        name="currentLocation"
                        value={deliveryData.currentLocation} // Set the value to 'Malabe'
                        disabled // Disable the input field
                    />
                </div>
                </div>
                <div className="form-column">
                <div className="form-group">
                    <label htmlFor="customerEmail">Customer Email:</label>
                    <input
                        type="text"
                        id="customerEmail"
                        name="customerEmail"
                        required
                        onChange={handleChange}
                        value={deliveryData.customerEmail}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Driver Name:</label>
                    <Select
                        value={selectedDriver}
                        onChange={(e) => handleDriverSelect(e.target.value)}
                    >
                        {drivers.map(driver => (
                            <MenuItem key={driver._id} value={driver.name}>{driver.name}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleType">Vehicle Type:</label>
                    <input
                        type="text"
                        id="vehicleType"
                        name="vehicleType"
                        onChange={handleChange}
                        value={deliveryData.vehicleType}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleNumber">Vehicle Number:</label>
                    <input
                        type="text"
                        id="vehicleNumber"
                        name="vehicleNumber"
                        onChange={handleChange}
                        value={deliveryData.vehicleNumber}
                    />
                </div>
                <div className="button-container">
                    <Button
                        className="button"
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                    <Link to={"/deliverydata"}>
                    <Button
                        className="button1"
                        type="cancel"
                        color="error"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    </Link>
                </div>
                </div>
                </div>
            </form>
            </div>
            <Footer/>
        </div>
    );
};

export default DeliveryForm;
