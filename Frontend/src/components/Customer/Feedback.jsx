import React, { useState } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Rating from '@mui/material/Rating';
import feedback from './images/feedback.png'
import './Create.css';
import Footer from '../Customer Management/Header&Footer/Footer';

const Feedback = () => {

  const [feedbackData, setFeedbackData] = useState({
    CustomerName: '',
    Email: '',
    Rating: 0, 
    Feedback: '',
  });

  const [alertOpen, setAlertOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({
      ...feedbackData,
      [name]: value,
    });
  };

  const handleRatingChange = (newValue) => {
    setFeedbackData({
      ...feedbackData,
      Rating: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/feedbacks', feedbackData).then(() => {
      setFeedbackData({
        CustomerName: '',
        Email: '',
        Rating: 0,
        Feedback: '',
      });
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    })
    .catch((error) => {
      alert('Error adding Feedback:', error);
    });
  };

  return (
    <div>
    <div className="container-feedback">
    <div className='container-twocol'>
    <div className='image-colum'>
        <img src={feedback} className='image'/>
      </div>

      <div className="inputs-feedback">
      <div className="header">
        <div className="text">Feedback</div>
        <div className="underline"></div>    
      </div>

          <label >Name</label>
          <div className="input-feedback">
            <AccountCircleIcon color="disabled" />
            <input type="text" id="name" placeholder="Name" name="CustomerName" onChange={handleChange} value={feedbackData.CustomerName} required />
          </div>

          <label >Email</label>
          <div className="input-feedback">
            <EmailIcon color="disabled" />
            <input type="email" id="email" placeholder="Email" name="Email" onChange={handleChange} value={feedbackData.Email} required />
          </div>

          <label >Rate your experience</label>
              <Rating
                name="simple-controlled"
                value={feedbackData.Rating}
                onChange={(event, newValue) => {
                  handleRatingChange(newValue);
                }}
                size="large"
                className='rating'
              />

          <label >Feedback</label>
          <div className="input1">
            <textarea type="text" id="feedback" placeholder="Feedback Message" name="Feedback" onChange={handleChange} value={feedbackData.Feedback} required />
          </div>
          <button type="submit" onClick={handleSubmit} className='createAcc' > Send Feedback </button>
        <Alert icon={<CheckIcon/>} severity="success" style={{ display: alertOpen ? '' : 'none' }} className='alert' >
          Your feedback was sent successfully!
        </Alert>
      </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Feedback;
