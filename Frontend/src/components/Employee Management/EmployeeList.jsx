import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Navbar";
import Footer from "../Customer Management/Header&Footer/Footer";
import EmployeeCard from "./EmployeeCard";
import "./EmployeeList.css";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ErrorIcon from '@mui/icons-material/Error';
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
        const response = await fetch("http://localhost:5000/api/employees");
        const data = await response.json();
        setEmployees(data);
        setNoResult(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const filteredEmployee = originalEmployees.filter((employee) =>
        Object.values(employee).some((field) =>
          field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setEmployees(filteredEmployee);
      setNoResult(filteredEmployee.length === 0);
    }
  };
  
  
  
  const handleClear = async () => {
    setSearchQuery("");
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      const data = await response.json();
      setEmployees(data); 
      setNoResult(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
  else if(e.key === 'Backspace' && searchQuery === '') {
    clearSearch();
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
      <div className="search">
        <input onChange={(e) => setSearchQuery(e.target.value)} type="text" name="search" className="searchInput" placeholder="Search Leaves"   style={{borderRadius: '50px',padding: '10px', background:'transparent'}} onKeyDown={handleKeyDown} value={searchQuery}/>
        {searchQuery ? (
          <Button  className="clearbtn_evebtn" startIcon={<CloseIcon/>}  size="large" onClick={handleClear}/>
          ):(
        <Button  className="searchbtn_evebtn" startIcon={<SearchIcon/>}  size="larger" onClick={handleSearch}/>
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
        {noResult && <p className='noResult'> <ErrorIcon style={{ fontSize: '2rem' }} /> No Results </p>}
        <Footer />
      </div>
    </div>
  );
};

export default EmployeeList;
