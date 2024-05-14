import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Navbar";
import Footer from "./Footer";
import "./InsertLeave.css";
import axios from "axios";
import { Button } from "@mui/material";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
    console.log(employeeData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/employees", employeeData).then(() => {
      setEmployeeData({
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
        Image: "",
      });
    });
  };

  return (
    <div>
      <Header />
      <h1>Employee Application Form</h1>
      <div className="all">
        <form action="#" method="post" className="form">
          <div className="form-column">
            <label htmlFor="employeeId">Employee ID:</label>
            <input
              type="text"
              id="employeeId"
              name="EmployeeId"
              required
              onChange={handleChange}
              value={employeeData.EmployeeId}
            />
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="Name"
              required
              onChange={handleChange}
              value={employeeData.Name}
            />
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              id="age"
              name="Age"
              required
              onChange={handleChange}
              value={employeeData.Age}
            />
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              name="Email"
              onChange={handleChange}
              value={employeeData.Email}
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="Address"
              onChange={handleChange}
              value={employeeData.Address}
            />
            <label htmlFor="designation">Designation:</label>
            <input
              type="text"
              id="designation"
              name="Designation"
              onChange={handleChange}
              value={employeeData.Designation}
            />
          </div>
          <div className="form-column">
            <label htmlFor="salary">Salary:</label>
            <input
              type="text"
              id="salary"
              name="Salary"
              onChange={handleChange}
              value={employeeData.Salary}
            />
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
              onChange={handleChange}
              value={employeeData.AllowancesAmount}
            />
            <label htmlFor="OT">OT Hours:</label>
            <input
              type="text"
              id="OT"
              name="OThours"
              onChange={handleChange}
              value={employeeData.OThours}
            />
            <label htmlFor="amountPerHour">Amount Per Hour:</label>
            <input
              type="text"
              id="amountPerHour"
              name="AmountPerHour"
              onChange={handleChange}
              value={employeeData.AmountPerHour}
            />
            <label htmlFor="image">Image URL:</label>
            <input
              type="URL"
              id="image"
              name="Image"
              onChange={handleChange}
              value={employeeData.Image}
              accept="image/JPG"
            />
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
