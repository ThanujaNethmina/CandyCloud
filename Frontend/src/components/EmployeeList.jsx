import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => {
        setEmployees(res.data);
        console.log(res.data);
      })
      .catch(() => console.log("Faild to load Data"));
  }, []);

  const employeeList =
    employees.length === 0
      ? "No employees "
      : employees.map((employee, index) => (
          <EmployeeCard employee={employee} key={index} />
        ));

  return (
    <div className="EmployeeList">
      <div className="container">
        <div className="list">{employeeList}</div>
      </div>
    </div>
  );
};

export default EmployeeList;
