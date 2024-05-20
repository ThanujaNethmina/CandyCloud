import React, { useState, useEffect } from 'react';
import NavigationBar from './NaviBar';
import Table from './Table';
import Item from './Item';
import AddRaw from './AddRaw';
import './App.css';
import RawMaterialTable from './RawTable';
import Pay from './Pay';

function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchRawMaterials();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8070/product');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

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

  const handleProductClick = () => {
    setCurrentPage('products');
  };

  const handleRawMaterialClick = () => {
    setCurrentPage('raw-materials');
  };

  const handleNavigateToAddRaw = () => {
    setCurrentPage('add-raw-material');
  };

  const handleAddProductClick = () => {
    setCurrentPage('add-product');
  };

  const handlePayClick = () => {
    setCurrentPage('pay');
  };

  const handleFormSubmit = (formData) => {
    setProducts((prevProducts) => [...prevProducts, formData]);
  };

  const handlePayProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId && product.Quantity > 0
          ? { ...product, Quantity: product.Quantity - 1 }
          : product
      )
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <div className="App">
      <NavigationBar
        onProductClick={handleProductClick}
        onRawMaterialClick={handleRawMaterialClick}
        onNavigateToAddRaw={handleNavigateToAddRaw}
        onAddProductClick={handleAddProductClick}
        onPayClick={handlePayClick}
        products={products}
        rawMaterials={rawMaterials}
      />
      <header className="App-header">
        {currentPage === 'products' && (
          <Table
            products={products}
            onEditProduct={handleEditProduct} // Pass handleEditProduct
            onDeleteProduct={handleDeleteProduct} // Pass handleDeleteProduct
          />
        )}
        {currentPage === 'raw-materials' && <RawMaterialTable />}
        {currentPage === 'add-product' && <Item onSave={handleFormSubmit} />}
        {currentPage === 'add-raw-material' && <AddRaw />}
        {currentPage === 'pay' && <Pay formProductData={products} onPayClick={handlePayProduct} />}
      </header>
    </div>
  );
}

export default App;
