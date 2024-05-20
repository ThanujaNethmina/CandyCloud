// src/NavigationBar.js
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import './NaviBar.css';
import img1 from './images/img1.png';
import PrintableProductReport from './PrintableProductReport';
import PrintableRawMaterialReport from './PrintableRawMaterialReport';

function NavigationBar({ onProductClick, onRawMaterialClick, onNavigateToAddRaw, onAddProductClick, onPayClick, products, rawMaterials }) {
  const [addItemDropdown, setAddItemDropdown] = useState(false);
  const [reportDropdown, setReportDropdown] = useState(false);
  const productReportRef = useRef();
  const rawMaterialReportRef = useRef();

  const handleAddItemClick = () => {
    setAddItemDropdown(!addItemDropdown);
  };

  const handleReportClick = () => {
    setReportDropdown(!reportDropdown);
  };

  const handlePrintProductReport = useReactToPrint({
    content: () => productReportRef.current,
  });

  const handlePrintRawMaterialReport = useReactToPrint({
    content: () => rawMaterialReportRef.current,
  });

  return (
    <div className="navigation-bar">
      <div className="navigation-left">
        <img src={img1} alt="Logo" />
        <h1>Candy Cloud Inventory System</h1>
      </div>
      <div className="navigation-right">
        <button className="button" onClick={onProductClick}>Products</button>
        <button className="button" onClick={onRawMaterialClick}>Raw Materials</button>
        <button className="button" onClick={onPayClick}>Payment</button>
        <div className="dropdown">
          <button className="button" onClick={handleAddItemClick}>
            Add Item <span className={`arrow ${addItemDropdown ? 'up' : 'down'}`}>&#9660;</span>
          </button>
          {addItemDropdown && (
            <div className="dropdown-content">
              <button className="button" onClick={onNavigateToAddRaw}>Add Raw Material</button>
              <button className="button" onClick={onAddProductClick}>Add Product</button>
            </div>
          )}
        </div>
        <div className="dropdown">
          <button className="button" onClick={handleReportClick}>
            Report <span className={`arrow ${reportDropdown ? 'up' : 'down'}`}>&#9660;</span>
          </button>
          {reportDropdown && (
            <div className="dropdown-content">
              <button className="button" onClick={handlePrintProductReport}>Product</button>
              <button className="button" onClick={handlePrintRawMaterialReport}>Raw Material</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "none" }}>
        <PrintableProductReport ref={productReportRef} products={products} />
        <PrintableRawMaterialReport ref={rawMaterialReportRef} rawMaterials={rawMaterials} />
      </div>
    </div>
  );
}

export default NavigationBar;
