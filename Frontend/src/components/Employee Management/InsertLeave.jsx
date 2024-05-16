import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Navbar";
import Footer from "../Customer Management/Header&Footer/Footer";
import "./InsertLeave.css";
import axios from "axios";
import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const InsertLeave = () => {
  const [leaveData, setLeaveData] = useState({
    LeaveId: "",
    EmployeeID: "",
    EmployeeName: "",
    Email: "",
    Date: "",
    LeaveReason: "",
    Status: "",
    StatusReason: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState({
    LeaveId: "",
    EmployeeID: "",
    EmployeeName: "",
    Email: "",
    Date: "",
    LeaveReason: "",
    Status: "",
    StatusReason: "",
  });

  const handleChangeAny = (e) => {
    const { name, value } = e.target;
    setLeaveData({
      ...leaveData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({
      ...leaveData,
      [name]: value.replace(/[^A-Za-z ]/g, ""),
    });
  };

  const validateEmail = (Email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(Email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!leaveData.EmployeeName) {
      newErrors.Name = "Name is required";
    }
    if (!leaveData.LeaveReason) {
      newErrors.LeaveReason = "Format change required";
    }
    if (!supplierData.Email) {
      newErrors.Email = "Email is required";
    } else if (!validateEmail(leaveData.Email)) {
      newErrors.Email = "Email format is wrong";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      axios
        .post("http://localhost:5000/api/leaves", supplier)
        .then(() => {
          setLeaveData({
            LeaveId: "",
            EmployeeID: "",
            EmployeeName: "",
            Email: "",
            Date: "",
            LeaveReason: "",
            Status: "",
            StatusReason: "",
          });
          setAlertOpen(true);
          setTimeout(() => {
            setAlertOpen(false);
          }, 3000);
        })
        .catch((error) => {
          alert("Error adding Leaves:", error);
        });
    }
  };

  return (
    <div>
      <Header />
      <h1>Leave Application Form</h1>
      <div className="all">
      <Alert icon={<CheckIcon/>} severity="success" style={{ display: alertOpen ? '' : 'none' }} className='alert' >
        Your account was created successfully!
      </Alert>
        <form action="#" method="post" onSubmit={handleSubmit} className="form">
          <div className="form-column">
            {errors.LeaveId && <p className="error">{errors.LeaveId}</p>}
            <label htmlFor="employeeId">Employee ID:</label>
            <input
              type="text"
              id="employeeId"
              name="EmployeeID"
              required
              onChange={handleChangeAny}
              value={leaveData.EmployeeID}
            />
            {errors.EmployeeID && <p className="error">{errors.EmployeeID}</p>}
            <label htmlFor="employeeName">Employee Name:</label>
            <input
              type="text"
              id="employeeName"
              name="EmployeeName"
              required
              onChange={handleChange}
              value={leaveData.EmployeeName}
            />
            {errors.EmployeeName && (
              <p className="error">{errors.EmployeeName}</p>
            )}
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="Email"
              onChange={handleChange}
              value={leaveData.Email}
            />
            {errors.Email && <p className="error">{errors.Email}</p>}
          
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="Date"
              onChange={handleChangeAny}
              value={leaveData.Date}
            />
            {errors.Date && <p className="error">{errors.Date}</p>}
            </div>
            <div className="form-column">
            <label htmlFor="leaveReason">Leave Reason:</label>
            <textarea
              id="leaveReason"
              name="LeaveReason"
              rows="5"
              cols="50"
              required
              onChange={handleChangeAny}
              value={leaveData.LeaveReason}
            ></textarea>
            {errors.LeaveReason && (
              <p className="error">{errors.LeaveReason}</p>
            )}
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="Status"
              value={leaveData.Status}
              onChange={handleChangeAny}
            >
              <option>Choose..</option>
              <option>Pending..</option>
            </select>
            {errors.Status && <p className="error">{errors.Status}</p>}
            <label htmlFor="statusReason">Status Reason:</label>
            <select
              id="statusReason"
              name="StatusReason"
              value={leaveData.StatusReason}
              onChange={handleChangeAny}
            >
              <option>Choose..</option>
              <option>Pending..</option>
            </select>
            {errors.StatusReason && (
              <p className="error">{errors.StatusReason}</p>
            )}
          </div>
        </form>
        <div className="form-actions">
          <div className="Button">
            <Button className="button" type="submit" variant="contained">
              Submit
            </Button>

            <Link to={"/Leave"}>
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
      <Footer />
    </div>
  );
};

export default InsertLeave;
