import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Navbar";
import Footer from "./Footer";
import AdminTable from "./AdminTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./Dashboard.css";

const Dashboard = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);

  useEffect(() => {
    fetchAdminCount();
    fetchEmployeeCount();
    fetchSalaryTotal();
  }, []);

  const fetchEmployeeCount = () => {
    axios
      .get(`http://localhost:5000/api/employees/count`)
      .then((response) => {
        if (response.data.status === "success") {
          setEmployeeTotal(response.data.data);
        } else {
          console.error(
            "Failed to fetch employee count:",
            response.data.message
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching employee count:", error);
      });
  };

  const fetchAdminCount = () => {
    axios
      .get(`http://localhost:5000/api/admins/count`)
      .then((response) => {
        if (response.data.status === "success") {
          setAdminTotal(response.data.data);
        } else {
          console.error("Failed to fetch admin count:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching admin count:", error);
      });
  };

  const fetchSalaryTotal = () => {
    axios
      .get(`http://localhost:5000/api/employees/salaryTotal`)
      .then((response) => {
        if (response.data.status === "success") {
          setSalaryTotal(response.data.data);
        } else {
          console.error("Failed to fetch total salary:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching total salary:", error);
      });
  };

  return (
    <div>
      <Header />
      <h1>Employee Management</h1>
      <div className="dash">
        <div className="Content">
          <div className="text-center pb-1">
            <h3>Manager</h3>
          </div>
          <hr className="Line" />
          <div className="d-flex justify-content-around">
            <h4>Total :</h4>
            <h4>{adminTotal}</h4>
          </div>
        </div>
        <div className="Content">
          <div className="text-center pb-1">
            <h3>Employee</h3>
          </div>
          <hr className="Line" />
          <div className="d-flex justify-content-around">
            <h4>Total :</h4>
            <h4>{employeeTotal}</h4>
          </div>
        </div>
        <div className="Content">
          <div className="text-center pb-1">
            <h3>Salary</h3>
          </div>
          <hr className="Line" />
          <div className="d-flex justify-content-around">
            <h4>Total :</h4>
            <h4>Rs. {salaryTotal}.00</h4>
          </div>
        </div>
      </div>
      <Box
        sx={{
          float: "left",
          marginTop: "20px",
          marginBottom: "30px",
          marginLeft: "20px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/InsertAdmin"
        >
          Add Managers
        </Button>
      </Box>
      <AdminTable />
      <Footer />
    </div>
  );
};

export default Dashboard;
