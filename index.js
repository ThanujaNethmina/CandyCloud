import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Delivery from './Delivery';
import Driver from './Driver';
import OrderDetails from './OrderDetails';
import Tracking from './Tracking';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
       <Route path='/' element={<App />}/>
       <Route path='/delivery' element={<Delivery />}/> {/* Define delivery route */}
       <Route path='/driver' element={<Driver />}/> {/* Define driver details route */}
       <Route path='/order-details' element={<OrderDetails/>}/>{}
       <Route path='/Tracking' element={<Tracking/>}/>{}
       

       
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
