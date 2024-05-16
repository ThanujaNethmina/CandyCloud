import React, { useState } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import WcIcon from '@mui/icons-material/Wc';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Create.css';

const CreateAccount = () => {
  const [customerData, setCustomerData] = useState({
    Name: '',
    Age: '',
    Gender: '',
    Address: '',
    phoneNumber: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errors, setErrors] = useState({
    Name: '',
    Age: '',
    Gender: '',
    Address: '',
    phoneNumber: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value.replace(/[^A-Za-z ]/g, ''),
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value.slice(0,2).replace(/[^0-9]/g, ''),
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleChangePhone = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value.slice(0,10).replace(/[^0-9]/g, ''),
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value.replace(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}/g, ''),
    });
    if (customerData.ConfirmPassword !== '') {
      setPasswordMatch(value === customerData.ConfirmPassword);
    }
    setErrors({ ...errors, [name]: '' });
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setPasswordMatch(value === customerData.Password);
    setCustomerData({
      ...customerData,
      ConfirmPassword: value,
    });
    setErrors({ ...errors, ConfirmPassword: '' });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newErrors = {};
  
    if (!customerData.Name) {
      newErrors.Name = "Name is required";
    }
    if (!customerData.Age) {
      newErrors.Age = "Age is required";
    }
    if (!customerData.Gender) {
      newErrors.Gender = "Gender is required";
    }
    if (!customerData.Address) {
      newErrors.Address = "Address is required";
    }
    if (!customerData.phoneNumber || customerData.phoneNumber.length < 10 || customerData.phoneNumber[0]===0) {
      newErrors.phoneNumber = "Phone number must be 10 characters";
    }
    if (!customerData.Email) {
      newErrors.Email = "Email is required";
    } else if (!validateEmail(customerData.Email)) {
      newErrors.Email = "Email format is wrong";
    }
    if (!customerData.Password) {
      newErrors.Password = "Password required";
    }
    if (!customerData.ConfirmPassword) {
      newErrors.ConfirmPassword = "Confirm Password is required";
    }
    if (!passwordMatch) {
      newErrors.ConfirmPassword = "Passwords do not match";
    }
  
    setErrors(newErrors);
  
    // If there are any errors, prevent form submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  
    axios.post('http://localhost:5000/api/customers', customerData)
    .then(() => {
      setCustomerData({
        Name: '',
        Age: '',
        Gender: '',
        Address: '',
        phoneNumber: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
      });
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    })
    .catch((error) => {
      console.error('Error adding Customer:', error.response.data);
      alert('Error adding Customer:', error.response.data);
    });

  };
  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">

        <div className="input">
          <AccountCircleIcon color="disabled" />
          <input type="text" id="name" placeholder="Name" name="Name" onChange={handleChange1} value={customerData.Name} required />
        </div>
        {errors.Name && <span className="error">{errors.Name}</span>}

        <div className="input">
          <EmojiPeopleIcon color="disabled" />
          <input type="number" id="age" placeholder="Age" name="Age" onChange={handleChange2} value={customerData.Age} required />
        </div>
        {errors.Age && <span className="error">{errors.Age}</span>}

        <div className="input">
          <WcIcon color="disabled" />
          <select id="gender" className="form-select" name="Gender" onChange={handleChange} value={customerData.Gender}>
            <option value="" disabled>Choose..</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {errors.Gender && <span className="error">{errors.Gender}</span>}

        <div className="input">
          <HomeIcon color="disabled" />
          <input type="text" id="address" placeholder="Address" name="Address" onChange={handleChange} value={customerData.Address} required />
        </div>
        {errors.Address && <span className="error">{errors.Address}</span>}

        <div className="input">
          <PhoneIcon color="disabled" />
          <input type="text" id="phoneNumber" placeholder="Phone Number" name="phoneNumber" onChange={handleChangePhone} value={customerData.phoneNumber} required />
        </div>
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

        <div className="input">
          <EmailIcon color="disabled" />
          <input type="email" id="email" placeholder="Email" name="Email" onChange={handleChange} value={customerData.Email} required />
        </div>
        {errors.Email && <span className="error">{errors.Email}</span>}
    
        <div className="input">
          <VpnKeyIcon color="disabled" />
          <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Password" name="Password" onChange={handleChangePassword} value={customerData.Password} required />
        </div>
        {errors.Password && <span className="error">{errors.Password}</span>}

        <div className="input">
          <VpnKeyIcon color={passwordMatch ? 'disabled' : 'error'} />
          <input type="password" id="confirmPassword" placeholder="Confirm Password" name="ConfirmPassword" onChange={handleConfirmPasswordChange} value={customerData.ConfirmPassword} required />
        </div>
        {errors.ConfirmPassword && <span className="error">{errors.ConfirmPassword}</span>}

        <div className='showPassword'>
          <Checkbox {...label} onClick={handleShowPassword} /><span>Show Password</span>
        </div>
      </div>
      <Button type="submit" onClick={handleSubmit} variant="contained" className='createAcc'> Create Account </Button>
      <Alert icon={<CheckIcon/>} severity="success" style={{ display: alertOpen ? '' : 'none' }} className='alert' >
        Your account was created successfully!
      </Alert>
      <div>
        <Typography variant="body1" className="no-acc">
          Already have an account?{" "}
          <span className="no-acc-reg" onClick={() => (window.location.href = "/login")}>
            Login
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default CreateAccount;
