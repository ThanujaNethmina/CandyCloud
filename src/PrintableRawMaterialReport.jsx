// src/PrintableRawMaterialReport.js
import React from 'react';

const PrintableRawMaterialReport = React.forwardRef((props, ref) => {
  const { rawMaterials } = props;

  if (!rawMaterials) {
    return <div ref={ref}>No raw materials available</div>;
  }

  return (
    <div ref={ref}>
      <h1>Raw Material Report</h1>
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
          {rawMaterials.map((material, index) => (
            <tr key={index}>
              <td>{material.item_id || ''}</td>
              <td>{material.RawMaterial_name || '-'}</td>
              <td>{material.Quantity || '-'}</td>
              <td>{material.value || '-'}</td>
              <td>{material.Expired_date ? new Date(material.Expired_date).toLocaleDateString() : '-'}</td>
              <td>{material.Manufactured_Date ? new Date(material.Manufactured_Date).toLocaleDateString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PrintableRawMaterialReport;
