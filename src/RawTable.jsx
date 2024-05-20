// src/RawMaterialTable.js
import React, { useState, useEffect } from 'react';
import './RawTable.css';
import EditRawForm from './EditRawForm';

function RawMaterialTable() {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);

  useEffect(() => {
    fetchRawMaterials();
  }, []);

  useEffect(() => {
    const filtered = rawMaterials.filter(material =>
      material.RawMaterial_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMaterials(filtered);
  }, [searchQuery, rawMaterials]);

  const fetchRawMaterials = async () => {
    try {
      const response = await fetch('http://localhost:8070/RawMaterial');
      if (!response.ok) {
        throw new Error('Failed to fetch raw materials');
      }
      const data = await response.json();
      setRawMaterials(data);
    } catch (error) {
      console.error('Error fetching raw materials:', error.message);
    }
  };

  const handleDelete = async (materialId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8070/RawMaterial/delete/${materialId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }

        setRawMaterials(prevMaterials => prevMaterials.filter(material => material._id !== materialId));
      } catch (error) {
        console.error('Error deleting item:', error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
  };

  return (
    <div className='table-container'>
      <h1>Raw Material</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Raw Material Name</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Expired Date</th>
            <th>Manufactured Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredMaterials.map((material) => (
            <tr key={material._id}>
              <td>{material.item_id || ''}</td>
              <td>{material.RawMaterial_name || '-'}</td>
              <td>{material.Quantity || '-'}</td>
              <td>{material.value || '-'}</td>
              <td>{material.Expired_date ? formatDate(material.Expired_date) : '-'}</td>
              <td>{material.Manufactured_Date ? formatDate(material.Manufactured_Date) : '-'}</td>
              <td>
                <button onClick={() => handleDelete(material._id)}>Delete</button>
                <button onClick={() => handleEdit(material)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingMaterial && <EditRawForm material={editingMaterial} />}
    </div>
  );
}

export default RawMaterialTable;
