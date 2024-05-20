import React, { useState } from 'react';
import './Item.css';

function RawMaterial({ onSubmit }) {
    const [formData, setFormData] = useState({
        itemId: '',
        rawMaterialName: '',
        quantity: '',
        value: '',
        expiredDate: '',
        manufacturedDate: '',
        ROL: '' // Adjusted variable name
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation for ItemId field to check for symbols
        if (name === 'itemId' && /[^a-zA-Z0-9]/.test(value)) {
            alert('Item ID cannot contain symbols');
            return;
        }

        // Validation for RawMaterialName field to allow only letters
        if (name === 'rawMaterialName' && /[^a-zA-Z]/.test(value)) {
            alert('Raw Material Name cannot contain numbers or symbols');
            return;
        }

        // Validation for ROL field to allow only numeric input
        if (name === 'ROL' && isNaN(value)) {
            alert('ROL must be a numeric value');
            return;
        }

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Perform validations
            if (
                !formData.itemId ||
                !formData.rawMaterialName ||
                !formData.quantity ||
                !formData.value ||
                !formData.expiredDate ||
                !formData.manufacturedDate ||
                !formData.ROL
            ) {
                throw new Error('All fields must be filled out');
            }

            // Additional validations
            if (isNaN(formData.quantity) || isNaN(formData.value)) {
                throw new Error('Quantity and value must be numeric');
            }

            if (new Date(formData.manufacturedDate) > new Date(formData.expiredDate)) {
                throw new Error('Manufactured date must be before expired date');
            }

            // Send the form data to the server
            const response = await fetch('http://localhost:8070/RawMaterial/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add Raw Material');
            }

            // Reset form after successful submission
            setFormData({
                itemId: '',
                rawMaterialName: '',
                quantity: '',
                value: '',
                expiredDate: '',
                manufacturedDate: '',
                ROL: ''
            });

            // Show success message
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error.message);
            alert(error.message);
        }
    };

    return (
        <div className="item-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="itemId">Item ID:</label>
                <input type="text" id="itemId" name="itemId" value={formData.itemId} onChange={handleChange} required />

                <label htmlFor="rawMaterialName">Raw Material Name:</label>
                <input type="text" id="rawMaterialName" name="rawMaterialName" value={formData.rawMaterialName} onChange={handleChange} required />

                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />

                <label htmlFor="value">Value: Rs.</label>
                <input type="number" id="value" name="value" value={formData.value} onChange={handleChange} required />

                <label htmlFor="expiredDate">Expired Date:</label>
                <input type="date" id="expiredDate" name="expiredDate" value={formData.expiredDate} onChange={handleChange} required />

                <label htmlFor="manufacturedDate">Manufactured Date:</label>
                <input type="date" id="manufacturedDate" name="manufacturedDate" value={formData.manufacturedDate} onChange={handleChange} required />

                <label htmlFor="ROL">ROL:</label>
                <input type="number" id="ROL" name="ROL" value={formData.ROL} onChange={handleChange} required />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RawMaterial;
