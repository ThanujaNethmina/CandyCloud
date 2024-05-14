import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeLeave from "./components/EmployeeLeave.jsx";
import Leave from "./components/Leave.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import InsertLeave from "./components/InsertLeave.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EmployeeInsert from "./components/EmployeeInsert.jsx";
import AdminInsert from "./components/AdminInsert.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "Dashboard",
    element: <Dashboard />,
  },

  {
    path: "EmployeeLeave",
    element: <EmployeeLeave />,
  },

  {
    path: "Leave",
    element: <Leave />,
  },

  {
    path: "Employee",
    element: <EmployeeList />,
  },

  {
    path: "Insert",
    element: <InsertLeave />,
  },

  {
    path: "InsertEmployee",
    element: <EmployeeInsert />,
  },

  {
    path: "InsertAdmin",
    element: <AdminInsert />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
