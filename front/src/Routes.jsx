import React from "react";
import { createBrowserRouter,useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Myorder from "pages/Myorder";
import Payment from "pages/Payment";
import HomePageOrder from "pages/HomePageOrder";
import OrderManagementPage from "pages/OrderManagementPage";
import Signup from "components/Signup";
import ManagePurchases from "pages/ManagePurchases";
import OrderPaymentManaging from  "pages/OrderPaymentManaging"
import ContactForm from "pages/ContactForm.jsx";
import MainDashboard from "pages/MainDashboard"

const ProjectRoutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
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
      element: <OrderPaymentManaging />
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
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return element;
};

export default ProjectRoutes;

