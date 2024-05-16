import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from './Header&Footer/NavBar'
import Footer from './Header&Footer/Footer'
import './CustomerTable.css'

const Dashboard = () => {

  useEffect(() => {
    fetchFeedbackCount();
    fetchCustomerCount();
  }, []);

  const [customerTotal, setCustomerTotal] = useState(0);

  const fetchCustomerCount = () => {
    axios
      .get(`http://localhost:5000/api/customers/count`)
      .then((response) => {
        if (response.data.status === "success") {
          setCustomerTotal(response.data.data);
        } else {
          console.error(
            "Failed to fetch employee count:",
            response.data.message
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching customer count:", error);
      });
  };


  const [feedbackTotal, setFeedbackTotal] = useState(0);

  const fetchFeedbackCount = () => {
    axios
      .get(`http://localhost:5000/api/feedbacks/count`)
      .then((response) => {
        if (response.data.status === "success") {
          setFeedbackTotal(response.data.data);
        } else {
          console.error("Failed to fetch feedback count:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching feddback count:", error);
      });
  };


  return (
    <div>
      <NavBar />
      <h1 className="head">Customer Management</h1>
      <div className="dashCont">
        <div className="contentDash">
          <div className="text-center pb-1">
            <h1>Customer</h1>
          </div>
          <hr className="hr" />
          <div className="d-flex justify-content-around">
            <h3>Total :</h3>
            <h3>{customerTotal}</h3>
          </div>
        </div>
        <div className="contentDash">
          <div className="text-center pb-1">
            <h1>Feedback</h1>
          </div>
          <hr className='hr' />
          <div className="d-flex justify-content-around">
            <h3>Total :</h3>
            <h3>{feedbackTotal}</h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;