// EditProductForm.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './EditProductForm.module.css';
 
function EditProductForm({ product, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    itemId: '',
    productName: '',
    quantity: '',
    value: '',
    expiredDate: null,
    manufacturedDate: null
  });

  useEffect(() => {
    if (product) {
      setFormData({
        itemId: product.item_id || '',
        productName: product.product_name || '',
        quantity: product.Quantity || '',
        value: product.value || '',
        expiredDate: product.Expired_date ? new Date(product.Expired_date) : null,
        manufacturedDate: product.Manufactured_Date ? new Date(product.Manufactured_Date) : null
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date, name) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8070/product/update/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      alert('Product updated successfully!');
      onUpdate(); // Notify parent component to update the table
      onCancel(false); // Hide the modal
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <span className={styles.close} onClick={() => onCancel(false)}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            Item ID:
            <input type="text" name="itemId" value={formData.itemId} onChange={handleChange} required />
          </label>
          <label>
            Product Name:
            <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
          </label>
          <label>
            Quantity:
            <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </label>
          <label>
            Value:
            <input type="text" name="value" value={formData.value} onChange={handleChange} required />
          </label>
          <label>
            Expired Date:
            <DatePicker
              selected={formData.expiredDate}
              onChange={date => handleDateChange(date, 'expiredDate')}
              dateFormat="yyyy-MM-dd"
              required
            />
          </label>
          <label>
            Manufactured Date:
            <DatePicker
              selected={formData.manufacturedDate}
              onChange={date => handleDateChange(date, 'manufacturedDate')}
              dateFormat="yyyy-MM-dd"
              required
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

EditProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default EditProductForm;
