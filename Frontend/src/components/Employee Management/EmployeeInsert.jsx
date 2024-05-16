import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Navbar";
import Footer from "../Customer Management/Header&Footer/Footer";
import "./InsertLeave.css";
import axios from "axios";
import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const EmployeeInsert = () => {
  const [employeeData, setEmployeeData] = useState({
    EmployeeId: "",
    Name: "",
    Age: "",
    Email: "",
    Address: "",
    Designation: "",
    Salary: "",
    AllowancesType: "",
    AllowancesAmount: "",
    OThours: "",
    AmountPerHour: "",
    TotalSalary: "",
    Image: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState({
    EmployeeId: "",
    Name: "",
    Age: "",
    Email: "",
    Address: "",
    Designation: "",
    Salary: "",
    AllowancesAmount: "",
    OThours: "",
    AmountPerHour: "",
    TotalSalary: "",
    Image: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value.replace(/[^A-Za-z ]/g, ''),
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value.slice(0,2).replace(/[^0-9]/g, ''),
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value.slice(0,6).replace(/[^0-9]/g, ''),
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleChangePhone = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value.slice(0,10).replace(/[^0-9]/g, ''),
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
  
    if (!employeeData.Name) {
      newErrors.Name = "Name is required";
    }
    if (!employeeData.Age) {
      newErrors.Age = "Age is required";
    }
    if (!employeeData.Email) {
      newErrors.Email = "Email is required";
    } else if (!validateEmail(employeeData.Email)) {
      newErrors.Email = "Email format is wrong";
    }
    if (!employeeData.Address) {
      newErrors.Address = "Address is required";
    }
    if (!employeeData.Designation) {
      newErrors.Designation = "Designation is required";
    }
    if (!employeeData.Salary) {
      newErrors.Salary = "Salary is required";
    }
    if (!employeeData.AllowancesAmount) {
      newErrors.AllowancesAmount = "Allowances Amount is required";
    }
    if (!employeeData.OThours) {
      newErrors.OThours = "Confirm OT hours is required";
    }
    if (!employeeData.AmountPerHour) {
      newErrors.AmountPerHour = "Confirm Amount per hour is required";
    }
    if (!employeeData.Image) {
      newErrors.Image = "Image is required";
    }
  
    setErrors(newErrors);
  
    // If there are any errors, prevent form submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  
    axios.post("http://localhost:5000/api/employees", employeeData).then(() => {
      setEmployeeData({
        Name: "",
        Age: "",
        Email: "",
        Address: "",
        Designation: "",
        Salary: "",
        AllowancesType: "",
        AllowancesAmount: "",
        OThours: "",
        AmountPerHour: "",
        Image: "",
      });
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
    });
  };

  return (
    <div>
      <Header />
      <div className="all">
      <h1>Employee Application Form</h1>
      <form action="#" method="post" className="form">
      <Alert icon={<CheckIcon/>} severity="success" style={{ display: alertOpen ? '' : 'none' }} className='alert' >
        Your account was created successfully!
      </Alert>
      <div className="form-column">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="Name"
          required
          onChange={handleChange1}
          value={employeeData.Name}
        />
        {errors.Name && <span className="error">{errors.Name}</span>}
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="Age"
          required
          onChange={handleChange2}
          value={employeeData.Age}
        />
        {errors.Age && <span className="error">{errors.Age}</span>}
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="Email"
          onChange={handleChange}
          value={employeeData.Email}
        />
        {errors.Email && <span className="error">{errors.Email}</span>}
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="Address"
          onChange={handleChange}
          value={employeeData.Address}
        />
        {errors.Address && <span className="error">{errors.Address}</span>}
        <label htmlFor="designation">Designation:</label>
        <input
          type="text"
          id="designation"
          name="Designation"
          onChange={handleChange1}
          value={employeeData.Designation}
        />
        {errors.Designation && <span className="error">{errors.Designation}</span>}
        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          id="salary"
          name="Salary"
          onChange={handleChange3}
          value={employeeData.Salary}
        />
        {errors.Salary && <span className="error">{errors.Salary}</span>}
        </div>
        <div className="form-column">
        <label htmlFor="type">Allowances Type:</label>
        <select
          id="type"
          class="form-select"
          name="AllowancesType"
          onChange={handleChange}
          value={employeeData.AllowancesType}
        >
          <option selected>Choose...</option>
          <option>Housing Allowance..</option>
          <option>Car Allowance..</option>
          <option>Health Insurance Allowance..</option>
          <option>Performance Bonus Allowance..</option>
          <option>Attendance Allowance..</option>
          <option>Transportation Allowance..</option>
          <option>Remote Work Allowance..</option>
        </select>
        <label htmlFor="allowancesAmount">Allowances Amount:</label>
        <input
          type="text"
          id="allowancesAmount"
          name="AllowancesAmount"
          onChange={handleChange3}
          value={employeeData.AllowancesAmount}
        />
        {errors.AllowancesAmount && <span className="error">{errors.AllowancesAmount}</span>}
        <label htmlFor="OT">OT Hours:</label>
        <input
          type="text"
          id="OT"
          name="OThours"
          onChange={handleChangePhone}
          value={employeeData.OThours}
        />
        {errors.OThours && <span className="error">{errors.OThours}</span>}
        <label htmlFor="amountPerHour">Amount Per Hour:</label>
        <input
          type="text"
          id="amountPerHour"
          name="AmountPerHour"
          onChange={handleChange3}
          value={employeeData.AmountPerHour}
        />
        {errors.AmountPerHour && <span className="error">{errors.AmountPerHour}</span>}
        <label htmlFor="image">Image URL:</label>
        <input
          type="URL"
          id="image"
          name="Image"
          onChange={handleChange}
          value={employeeData.Image}
          accept="image/JPG"
        />
        {errors.Image && <span className="error">{errors.Image}</span>}
        </div>
        </form>
        <div className="form-actions">
          <div className="Button">
        <Button
          className="button"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Link to={"/Employee"}>
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

export default EmployeeInsert;
