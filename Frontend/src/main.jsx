import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';

//customer
import Login from './components/Customer/Login.jsx';
import CustomerTbl from './components/Customer Management/CustomerTable.jsx';
import FeedbackTbl from './components/Customer Management/FeedbackTable.jsx';
import FaqTbl from './components/Customer Management/FaqTable.jsx';
import Feedback from './components/Customer/Feedback.jsx';
import Dashboard from './components/Customer Management/Dashboard.jsx';
import MainDashboard from './components/MainDashboard.jsx';
import AdminLog from './components/Customer/AdminLogin.jsx'

//supplier
import SupplierTable from './components/Supplier Management/SupplierTable.jsx';
import AddSupplier from './components/Supplier Management/SupplierAdd.jsx';
import SupplierRaw from './components/Supplier Management/SupplierRequestTable.jsx';

//employee
import EmployeeDash from './components/Employee Management/Dashboard.jsx';
import EmployeeLeave from './components/Employee Management/EmployeeLeave.jsx';
import Leave from "./components/Employee Management/Leave.jsx";
import EmployeeList from "./components/Employee Management/EmployeeList.jsx";
import InsertLeave from "./components/Employee Management/InsertLeave.jsx";
import EmployeeInsert from "./components/Employee Management/EmployeeInsert.jsx";
import AdminInsert from "./components/Employee Management/AdminInsert.jsx";

//delivery
import Delivery from './components/Delivery Management/Delivery.jsx';
import Driver from './components/Delivery Management/Driver.jsx';
import OrderDetails from './components/Delivery Management/OrderDetails.jsx';
import Tracking from './components/Delivery Management/Tracking.jsx';
import DeliveryForm from './components/Delivery Management/DeliveryFrom.jsx';
import DriverForm from './components/Delivery Management/DriverFrom.jsx'

import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from "react-router-dom"; 


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {path: "/", element: <App/>,},
  {path: "login", element: <Login/>,},
  {path:"feedback", element: <Feedback/>},
  {path: "customertbl", element: <CustomerTbl/>,},
  {path: "faqtbl", element: <FaqTbl/>,},
  {path:"feedbacktbl", element: <FeedbackTbl/>},
  {path:"dashboard", element: <Dashboard/>},
  {path:"maindashboard", element: <MainDashboard/>},
  {path:"adminlogin", element:<AdminLog/>},

  {path:"suppliertbl", element: <SupplierTable/>},
  {path:"addSupplier", element: <AddSupplier/>},
  {path:"supplierRaw", element: <SupplierRaw/>},

  {path:"employeedash", element: <EmployeeDash/>},
  {path:"EmployeeLeave",element: <EmployeeLeave/>},
  {path:"Leave", element: <Leave/>},
  {path:"Employee", element: <EmployeeList/>},
  {path:"Insert", element: <InsertLeave/>},
  {path:"InsertEmployee",element: <EmployeeInsert/>},
  {path:"InsertAdmin",element: <AdminInsert/>},

  
  {path:"deliverydata", element: <Delivery/>},
  {path:"drivers", element: <Driver/>},
  {path:"deliveryOrder", element: <OrderDetails/>},
  {path:"tracking", element: <Tracking/>},
  {path:"delivery-form", element:<DeliveryForm/>},
  {path:"drivers-from", element:<DriverForm/>},


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
          <App />
      </RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);