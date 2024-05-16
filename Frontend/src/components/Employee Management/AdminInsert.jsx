import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Navbar";
import Footer from "../Customer Management/Header&Footer/Footer";
import "./InsertLeave.css";
import axios from "axios";
import { Button } from "@mui/material";

const AdminInsert = () => {
  const [adminData, setAdmindata] = useState({
    UserName: "",
    Email: "",
    pNo: "",
    Address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmindata({
      ...adminData,
      [name]: value,
    });
    console.log(adminData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/admins", adminData).then(() => {
      setAdmindata({
        UserName: "",
        Email: "",
        pNo: "",
        Address: "",
        Password: "",
      });
    });
  };

  return (
    <div>
      <Header />
      <h1>Leave Application Form</h1>
      <form action="#" method="post">
        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          id="username"
          name="UserName"
          required
          onChange={handleChange}
          value={adminData.UserName}
        />
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          id="email"
          name="Email"
          required
          onChange={handleChange}
          value={adminData.Email}
        />
        <label htmlFor="pNumber">Phone Number:</label>
        <input
          type="text"
          id="pNumber"
          name="pNo"
          required
          onChange={handleChange}
          value={adminData.pNo}
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="Address"
          onChange={handleChange}
          value={adminData.Address}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          name="Password"
          onChange={handleChange}
          value={adminData.Password}
        />
        <Button
          className="button"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Link to={"/employeedash"}>
          <Button
            className="button1"
            type="cancel"
            color="error"
            variant="contained"
          >
            Cancel
          </Button>
        </Link>
      </form>
      <Footer />
    </div>
  );
};

export default AdminInsert;
