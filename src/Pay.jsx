import React, { useState, useEffect } from 'react';
import './Table.css';

function Pay({ formProductData, onPayClick }) {
  const [products, setProducts] = useState(formProductData || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setProducts(formProductData);
    setFilteredProducts(formProductData);
  }, [formProductData]);

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

  const handlePayClick = (productId) => {
    onPayClick(productId);
  };

  return (
    <div className='table-container'>
      <h1>Products</h1>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product.item_id || ''}</td>
                  <td>{product.product_name || '-'}</td>
                  <td>
                    <button onClick={() => handlePayClick(product._id)}>Pay</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pay;
