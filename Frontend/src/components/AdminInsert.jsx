import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Navbar";
import Footer from "./Footer";
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
    axios
      .post("http://localhost:5000/api/admins", adminData)
      .then(() => {
        setAdmindata({
          UserName: "",
          Email: "",
          pNo: "",
          Address: "",
        });
        alert("Details submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting details:", error);
        alert(
          "An error occurred while submitting details. Please try again later."
        );
      });
  };

  return (
    <div>
      <Header />
      <h1>Manager Application Form</h1>
      <div className="all">
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
            type="email"
            id="address"
            name="Address"
            onChange={handleChange}
            value={adminData.Address}
          />
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
            <Link to={"/Dashboard"}>
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

export default AdminInsert;
