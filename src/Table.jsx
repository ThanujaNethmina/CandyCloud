import React, { useState, useEffect } from 'react';
import EditProductForm from './EditProductForm';
import Chart from './Chart';
import './Table.css';

function Table({ products, onEditProduct, onDeleteProduct }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editProductId, setEditProductId] = useState('');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (productId) => {
    setEditProductId(productId);
    setIsEditFormVisible(true);
  };

  const handleEditCancel = () => {
    setEditProductId('');
    setIsEditFormVisible(false);
  };

  const chartData = {
    labels: filteredProducts.map(product => product.product_name),
    quantityData: filteredProducts.map(product => product.Quantity)
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const totalValue = filteredProducts.reduce((sum, product) => sum + (product.value || 0), 0);

  return (
    <div className='table-container'>
      <h1>Products</h1>
      <div className='total-value'>
      <strong> <center>Total Value: Rs. {totalValue.toFixed(2)}</center></strong>
      </div>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
        style={{
          width: '550px',
          padding: '8px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      />

      <div className="content-container">
        <div className="table-content">
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} style={{ backgroundColor: product.Quantity < product.ROL ? 'red' : 'inherit' }}>
                  <td>{product.item_id || ''}</td>
                  <td>{product.product_name || '-'}</td>
                  <td>{product.Quantity || '-'}</td>
                  <td>{product.value || '-'}</td>
                  <td>{product.Expired_date ? formatDate(product.Expired_date) : '-'}</td>
                  <td>{product.Manufactured_Date ? formatDate(product.Manufactured_Date) : '-'}</td>
                  <td>{product.ROL || '-'}</td>
                  <td>
                    <button onClick={() => handleEdit(product._id)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => onDeleteProduct(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isEditFormVisible && (
            <div className="edit-modal">
              <div className="edit-modal-content">
                <span className="close" onClick={handleEditCancel}>&times;</span>
                <EditProductForm
                  product={products.find(product => product._id === editProductId)}
                  onCancel={handleEditCancel}
                />
              </div>
            </div>
          )}
        </div>
        <div className="chart-content">
          <Chart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Table;
