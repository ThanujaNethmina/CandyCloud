// src/PrintableProductReport.js
import React from 'react';
import img1 from './images/img1.png'; // Import your image

const PrintableProductReport = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <img src={img1} alt="Logo" style={{ width: '100px', marginRight: '20px' }} /> {/* Add your image here */}
      <h2 style={{ margin: 0 }}><center>Candy Cloud Inventory Product Report</center></h2> {/* Change the heading */}
    </div>
    <table>
      <thead>
        <tr>
          <th>Item ID</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Value Rs.</th>
          <th>Expired Date</th>
          <th>Manufactured Date</th>
          <th>ROL</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map((product, index) => (
          <tr key={index}>
            <td>{product.item_id || '-'}</td>
            <td>{product.product_name || '-'}</td>
            <td>{product.Quantity || '-'}</td>
            <td>{product.value || '-'}</td>
            <td>{product.Expired_date ? new Date(product.Expired_date).toLocaleDateString() : '-'}</td>
            <td>{product.Manufactured_Date ? new Date(product.Manufactured_Date).toLocaleDateString() : '-'}</td>
            <td>{product.ROL || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

export default PrintableProductReport;
