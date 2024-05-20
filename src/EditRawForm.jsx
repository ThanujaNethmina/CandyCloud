import React, { useState, useEffect } from 'react';
import './EditRawForm.css'

function EditRawForm({ material }) {
  const [formData, setFormData] = useState(material);

  useEffect(() => {
    setFormData(material);
  }, [material]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8070/RawMaterial/update/${material._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update raw material');
      }

      alert('Raw material updated successfully!');
    } catch (error) {
      console.error('Error updating raw material:', error);
      alert('Failed to update raw material. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Raw Material</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item ID:
          <input type="text" name="itemId" value={formData.itemId || ''} onChange={handleChange} required />
        </label>
        <label>
          Raw Material Name:
          <input type="text" name="rawMaterialName" value={formData.rawMaterialName || ''} onChange={handleChange} required />
        </label>
        <label>
          Quantity:
          <input type="text" name="quantity" value={formData.quantity || ''} onChange={handleChange} required />
        </label>
        <label>
          Value:
          <input type="text" name="value" value={formData.value || ''} onChange={handleChange} required />
        </label>
        <label>
          Expired Date:
          <input type="date" name="expiredDate" value={(formData.expiredDate && formData.expiredDate.split('T')[0]) || ''} onChange={handleChange} required />
        </label>
        <label>
          Manufactured Date:
          <input type="date" name="manufacturedDate" value={(formData.manufacturedDate && formData.manufacturedDate.split('T')[0]) || ''} onChange={handleChange} required />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditRawForm;
