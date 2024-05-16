import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Navbar from './Navbar';
import Footer from '../Customer Management/Header&Footer/Footer';
import axios from 'axios';
import "./TrackingForm.css"; // Import CSS file

const TrackingForm = () => {
    const [trackingCode, setTrackingCode] = useState(''); // Changed trackingId to trackingCode
    const [deliveryData, setDeliveryData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch delivery details based on tracking code from backend
        if (trackingCode) {
            setLoading(true);
            axios.get(`http://localhost:5000/api/deliveries/${trackingCode}`)
                .then((response) => {
                    // Assuming the response contains current location data
                    const data = response.data;
                    setDeliveryData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching delivery details:', error);
                    setLoading(false);
                });
        }
    }, [trackingCode]);

    const handleChange = (e) => {
        setTrackingCode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Fetch delivery details based on tracking code from backend
        setLoading(true);
    };

    return (
        <div>
            <Navbar />
            <div className="form-container">
                <form onSubmit={handleSubmit} className="tracking-form">
                    <label>
                        Tracking Code: {/* Changed label text here */}
                        <input
                            type="text"
                            value={trackingCode}
                            onChange={handleChange}
                            placeholder="Enter Tracking Code" // Updated placeholder text
                            className="tracking-input"
                        />
                    </label>
                    <Button type="submit" variant="contained" disabled={loading}>
                        Submit
                    </Button>
                </form>
            </div>
            <div className="map-container">
                <LoadScript googleMapsApiKey="AIzaSyA6g7J73slhUPWkJtqGUM53hgjC3U5DXgQ">
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        center={deliveryData.currentLocation || { lat: 0, lng: 0 }}
                        zoom={10}
                    >
                        {deliveryData.currentLocation && (
                            <Marker
                                position={deliveryData.currentLocation}
                            />
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
            <Footer />
        </div>
    );
};

export default TrackingForm;
