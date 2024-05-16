import React from "react";
import {useRoutes } from "react-router-dom";
import Myorder from "./pages/Myorder";
import Payment from "./pages/Payment";
import HomePageOrder from "./pages/HomePageOrder";
import OrderManagementPage from "./pages/OrderManagementPage";
import Signup from "./components/Order Management/Signup";
import ManagePurchases from "./pages/ManagePurchases";
import OrderPaymentManaging from  "./pages/OrderPaymentManaging"
import ContactForm from "./pages/ContactForm.jsx";
import MainDashboard from "./components/MainDashboard"


const ProjectRoutes = () => {
  const element = useRoutes([
 
    {
      path: "myorder",
      element: <Myorder />
    },
    {
      path: "payment",
      element: <Payment />
    },
    {
      path: "Orderpaymentmanaging",
      element: <OrderManagementPage />
    },
    {
      path: "homepageorder",
      element: <HomePageOrder />
    },
    {
      path: "ordermanagementpage",
      element: <OrderManagementPage />
    },
    {
      path: "managepurchases",
      element: <ManagePurchases />
    },
    {
      path: "contactform",
      element: <ContactForm />
    },
    {
      path: "maindashboard",
      element: <MainDashboard />
    },
    {
      path: "/signup",
      element: <Signup />
    }
  ]);

  return element;
};

export default ProjectRoutes;

