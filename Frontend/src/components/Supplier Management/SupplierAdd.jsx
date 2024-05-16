import React, { useState } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import Footer from './Header&Footer/Footer'
import './SupplierAdd.css';

const SupplierAdd = () => {

  const [supplierData, setSupplierData] = useState({
    SupplierName: '',
    SupplyingItem: '',
    Email: '',
  });

  const [errors, setErrors] = useState({
    SupplierName: '',
    SupplyingItem: '',
    Email: '',
  });

  const handleChangeAny = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value.replace(/[^A-Za-z ]/g, ''),
    });
    setErrors({ ...errors, [name]: '' });
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!supplierData.SupplierName) {
      newErrors.Name = "Name is required";
    }
    if (!supplierData.SupplyingItem) {
      newErrors.SupplyingItem = "Format change required";
    }
    if (!supplierData.Email) {
      newErrors.Email = "Email is required";
    } else if (!validateEmail(supplierData.Email)) {
      newErrors.Email = "Email format is wrong";
    }
    axios.post('http://localhost:5000/api/suppliers', supplierData).then(() => {
      setSupplierData({
        SupplierName: '',
        SupplyingItem: '',
        Email: '',
      });
      alert('Supplier added successfully');
    })
    .catch((error) => {
        alert('Error adding supplier:', error);
      });
  };

  return (
    <div>
    <div className="container">
      <div className="header">
        <div className="text">Add Supplier</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
          <div className="input">
            <AccountCircleIcon color="disabled" />
            <input type="text" id="supplierName" placeholder="Name" name="SupplierName" onChange={handleChange} value={supplierData.SupplierName} required />
          </div>
        
          <div className="input">
            <CategoryIcon color="disabled" />
            <input type="text" id="supplyingItem" placeholder="Supplying Item" name="SupplyingItem" onChange={handleChangeAny} value={supplierData.SupplyingItem} required />
          </div>

        <div className="input">
          <EmailIcon color="disabled" />
          <input type="email" id="email" placeholder="Email" name="Email" onChange={handleChange} value={supplierData.Email} required />
        </div>
        {errors.Email && <span className="error">{errors.Email}</span>}
      </div>
      <div className='optButton'>
        <Button type="submit" onClick={handleSubmit} className='createAcc' color='success' variant='contained' > Add </Button>
        <Button  onClick={()=>(window.location.href="suppliertbl")} className='createAcc' color='error' variant='contained'> Cancel </Button>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default SupplierAdd;
