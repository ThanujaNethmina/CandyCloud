import axios from "axios";
import React, { useState } from 'react';
import { Button } from "@mui/material";
import Navbar from './Navbar'; 
import "./DriverFrom.css";
import Footer from "../Customer Management/Header&Footer/Footer";

const DriverForm = ({ onClose }) => {
    const [driverData, setDriverData] = useState({
        name: "",
        NIC: "",
        address: "",
        tel_number: "",
        number: "",
        type: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        NIC: "",
        tel_number: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Validation regex allowing only letters, numbers, and spaces
        const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;

        // If the value contains symbols, remove them
        if (!alphanumericRegex.test(value)) {
            sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
        }

        // Validate if the address starts with a letter or a number
        if (name === 'address' && !validateAddressStart(sanitizedValue)) {
            setErrors({ ...errors, address: "Address must start with a letter or a number" });
        } else {
            setErrors({ ...errors, address: "" });
        }

        setDriverData(prevState => ({
            ...prevState,
            [name]: sanitizedValue,
        }));
    };

    const handleChangeString = (e) => {
        const { name, value } = e.target;
        setDriverData({
            ...driverData,
            [name]: value.replace(/[^A-Za-z ]/g, ''), // Modified regex
        });
        setErrors({ ...errors, [name]: "" });
    };

    const handleChangeNIC = (e) => {
        const { name, value } = e.target;
        let newValue = value.replace(/[^0-9vV]/g, "").slice(0, 12); // Remove non-numeric and limit to 12 characters

        if (/^\d{11}$/.test(newValue)) {
            newValue += '';
        }

        setDriverData({
            ...driverData,
            [name]: newValue,
        });
        setErrors({ ...errors, [name]: "" });
    };


    const handleChangeTP = (e) => {
        const { name, value } = e.target;
        let newValue = value.replace(/[^0-9]/g, "").slice(0, 10);

        setDriverData({
            ...driverData,
            [name]: newValue,
        });
        setErrors({ ...errors, [name]: "" });
    };

    const handleChangeVehicleNumber = (e) => {
        const { name, value } = e.target;
        setDriverData({
            ...driverData,
            [name]: value.replace(/[^A-Za-z0-9]/g, ''),
        });
        setErrors({ ...errors, [name]: "" });
    };

    const handleChangeVehicleType = (e) => {
        const { name, value } = e.target;
        setDriverData({
            ...driverData,
            [name]: value.replace(/[^A-Za-z ]/g, ''),
        });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!driverData.name) {
            setErrors({ ...errors, name: "Driver name is required" });
            return;
        }
        if (driverData.NIC.length < 10) {
            setErrors({ ...errors, NIC: "NIC must be at least 10 characters" });
            return;
        }
        if (driverData.tel_number.length !== 10) {
            setErrors({ ...errors, tel_number: "Telephone number must be 10 characters" });
            return;
        }
        axios.post("http://localhost:5000/api/drivers", driverData)
            .then(() => {
                setDriverData({
                    name: "",
                    NIC: "",
                    address: "",
                    tel_number: "",
                    number: "",
                    type: "",
                });
                onClose(); // Close the form after successful submission
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                // Handle error
            });
    };

    const validateAddressStart = (address) => {
        const firstChar = address.charAt(0);
        const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;
        return alphanumericRegex.test(firstChar);
    };

    return (
        <div >
            <Navbar/>
            <h1>Driver Details Form</h1>
            <div className="all">
            <form action="#" method="post" className="form">
                <div className="form-container">
                    <div className="form-column">
                        <label htmlFor="name">Driver Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            onChange={handleChangeString}
                            value={driverData.name}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                        <label htmlFor="NIC">Driver NIC:</label>
                        <input
                            type="text"
                            id="NIC"
                            name="NIC"
                            required
                            onChange={handleChangeNIC}
                            value={driverData.NIC}
                        />
                        {errors.NIC && <span className="error">{errors.NIC}</span>}
                        <label htmlFor="address">Driver Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            onChange={handleChange}
                            value={driverData.address}
                        />
                        {errors.address && <span className="error">{errors.address}</span>}
                        </div>
                    <div className="form-column">
                        <label htmlFor="tel_number">Driver Tel Number:</label>
                        <input
                            type="text"
                            id="tel_number"
                            name="tel_number"
                            onChange={handleChangeTP}
                            value={driverData.tel_number}
                        />
                        {errors.tel_number && <span className="error">{errors.tel_number}</span>}
                        <label htmlFor="number">Vehicle Number:</label>
                        <input
                            type="text"
                            id="number"
                            name="number"
                            onChange={handleChangeVehicleNumber}
                            value={driverData.number}
                        />
                        <label htmlFor="type">Vehicle Type:</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            onChange={handleChangeVehicleType}
                            value={driverData.type}
                        />
                <div className="form-actions">
                        <Button
                            className="button"
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        <Button
                            className="button1"
                            type="button" // Changed from "cancel" to "button"
                            color="error"
                            variant="contained"
                            onClick={onClose} // Modified onClick event to close the form
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
                </div>
            </form>
            </div>
           <Footer/> 
        </div>
    );
}

export default DriverForm;
