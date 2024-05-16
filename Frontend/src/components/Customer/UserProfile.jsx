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
import './Create.css';

const UserProfile = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">

          <lable>Name:</lable>
          <div className="input">
            <AccountCircleIcon color="disabled" />
            <input type="text" id="name" placeholder="Name" name="Name" onChange={handleChange} value={customerData.Name} required />
          </div>

          <lable>Age:</lable>
          <div className="input">
            <EmojiPeopleIcon color="disabled" />
            <input type="number" id="age" placeholder="Age" name="Age" onChange={handleChange} value={customerData.Age} required />
          </div>

          <lable>Gender</lable>
          <div className="input">
            <WcIcon color="disabled" />
            <select id="gender" class="form-select" name="Gender" onChange={handleChange} value={customerData.Gender}>
              <option selected>Choose..</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <lable>Address:</lable>
          <div className="input">
            <HomeIcon color="disabled" />
            <input type="text" id="address" placeholder="Address" name="Address" onChange={handleChange} value={customerData.Address} required />
          </div>

          <lable>Phone Number:</lable>
          <div className="input">
            <PhoneIcon color="disabled" />
            <input type="text" id="phoneNumber" placeholder="Phone Number" name="phoneNumber" onChange={handleChange} value={customerData.phoneNumber} required />
          </div>


          <lable>Email:</lable>
        <div className="input">
          <EmailIcon color="disabled" />
          <input type="email" id="email" placeholder="Email" name="Email" onChange={handleChange} value={customerData.Email} required />
        </div>

        <lable>Password:</lable>
        <div className="input">
          <VpnKeyIcon color="disabled" />
          <input type="password" id="password" placeholder="Password" name="Password" onChange={handleChange} value={customerData.Password} required />
        </div>
      </div>

        <button type="submit" onClick={handleSubmit} className='createAcc'> Save Change </button>
        <Alert icon={<CheckIcon/>} severity="success" style={{ display: alertOpen ? '' : 'none' }} className='alert' >
          Your account was created successfully!
        </Alert>
        <div>
              <p className="no-acc">
                Already have an account?{" "}
                <span className="no-acc-reg" onClick={() => (window.location.href = "/login")}>
                  Login
                </span>
              </p>
            </div>

    </div>
  );
};

export default UserProfile;
