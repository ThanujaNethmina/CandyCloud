import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Navbar";
import Footer from "./Footer";
import EmployeeCard from "./EmployeeCard";
import "./EmployeeList.css";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ReactToPrint from "react-to-print";

const EmployeeList = () => {
  const [employee, setEmployees] = useState([]);
  const [originalEmployees, setOriginalEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees/")
      .then((res) => {
        setEmployees(res.data);
        setOriginalEmployees(res.data);
        console.log(res.data);
      })
      .catch(() => console.log("Failed to load Data"));
  }, []);

  const handleDeleteEmployee = (_id) => {
    axios
      .delete(`http://localhost:5000/api/employees/${_id}`)
      .then(() => {
        console.log("Employee deleted successfully");
        // Filter out the deleted employee from the state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp._id !== _id)
        );
      })
      .catch((err) => {
        console.error("Error deleting employee:", err);
      });
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      try {
        const response = await fetch("http://localhost:5000/api/leaves");
        const data = await response.json();
        setEmployeeLeaves(data);
        setNoResult(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const filteredLeaves = leaves.filter((leave) =>
        Object.values(leave).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      console.log("Filtered Leaves:", filteredLeaves);
      setEmployeeLeaves(filteredLeaves);
      setNoResult(filteredLeaves.length === 0); // Set noResult based on whether there are search results
      console.log("No Result:", noResult);
    }
  };

  const handleClearSearch = async () => {
    setSearchQuery(""); // Reset the search query
    setEmployeeLeaves([]); // Clear the displayed results
    try {
      const response = await fetch("http://localhost:5000/api/leaves");
      const data = await response.json();
      setEmployeeLeaves(data); // Fetch all leaves again
      setNoResult(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const searchInput = document.querySelector(".search_input");
    if (searchInput) {
      searchInput.value = "";
    }
  };

  const employeeList =
    employee.length === 0
      ? "No employees "
      : employee.map((employee, index) => (
          <EmployeeCard
            employee={employee}
            key={employee._id}
            onDelete={handleDeleteEmployee}
          />
        ));

  return (
    <div>
      <Header />
      <h1>Employee Management</h1>
      <div>
        <input
          sx={{
            float: "right",
            marginBottom: "20px",
            marginRight: "20px",
            width: "80%",
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          className="search_input"
          placeholder="Search Employees"
        ></input>
        <Button
          sx={{
            float: "right",
            marginBottom: "20px",
            marginRight: "20px",
          }}
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Search
        </Button>
        {searchQuery && (
          <Button
            sx={{
              float: "right",
              marginBottom: "20px",
              marginRight: "20px",
            }}
            variant="contained"
            color="error"
            startIcon={<ClearIcon />}
            onClick={handleClearSearch}
          >
            Clear
          </Button>
        )}
      </div>
      <div className="add">
        {" "}
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to="/InsertEmployee"
          >
            Add Employees
          </Button>
        </Box>
      </div>
      <div className="EmployeeList">
        <div className="container">
          <div className="list" ref={componentRef}>
            {employeeList}
          </div>
        </div>
      </div>
      <div className="genRep">
        <Box>
          <ReactToPrint
            trigger={() => (
              <Button variant="contained" startIcon={<DescriptionIcon />}>
                Generate Report
              </Button>
            )}
            content={() => componentRef.current}
            documentTitle="Employee Details Report"
            onAfterPrint={() =>
              alert("Employee Detail Report Successfully Downloaded !")
            }
          />
        </Box>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default EmployeeList;
