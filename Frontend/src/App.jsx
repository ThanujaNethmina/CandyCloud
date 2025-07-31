<<<<<<< Updated upstream
import './App.css';
import AppRoutes from './routes';
=======
import { useState } from "react";

import "./App.css";
//import EmployeeCard from "./components/EmployeeCard";
//import EmployeeList from "./components/EmployeeList";
//import { CardMedia } from "@mui/material";
import Cart from "./components/Cart";
>>>>>>> Stashed changes

function App() {
  //need set  login user id
  localStorage.setItem("userId","66194666a02984b0db969e2f")
  return (
<<<<<<< Updated upstream
   <>
        <AppRoutes />
   </>
=======
    <>
      <Cart />
    </>
>>>>>>> Stashed changes
  );
}

export default App;
