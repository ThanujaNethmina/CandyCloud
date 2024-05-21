import React from 'react';
import Navbar from './Navbar';
import Footer from '../Customer Management/Header&Footer/Footer';
import './OrderDetails.css';

function OrderDetails() {
  // Dummy data for demonstration
  const orderDetails = [
    {
      itemId: '1',
      customerAddress: 'Kandy',
      customerEmail: 'john@example.com',
      name: 'John Doe',
      
    },
    {
      itemId: '3',
      customerAddress: 'Rathnapura',
      customerEmail: 'doe@example.com',
      name: 'Sisra',
      
    },
    {
      itemId: '123456',
      customerAddress: '123 Main St, City',
      customerEmail: 'customer@example.com',
      name: 'John Doe',
      
    },
    {
      itemId: '123456',
      customerAddress: '123 Main St, City',
      customerEmail: 'customer@example.com',
      name: 'John Doe',
     
    },
    {
      itemId: '123456',
      customerAddress: '123 Main St, City',
      customerEmail: 'customer@example.com',
      name: 'John Doe',
      
    },
    {
      itemId: '123456',
      customerAddress: '123 Main St, City',
      customerEmail: 'customer@example.com',
      name: 'John Doe',
      
      
    },
  
  ];

  return (
    <div>
      <Navbar />
      <div className="order-details-container">
        {orderDetails.map((order, index) => (
          <div key={index} className="order-box">
            <h2>Order {index + 1}</h2>
            <p>Item ID: {order.itemId}</p>
            <p>Customer Address: {order.customerAddress}</p>
            <p>Customer Email: {order.customerEmail}</p>
            <p>Name: {order.name}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default OrderDetails;

