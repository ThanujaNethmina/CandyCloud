import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ReactToPrint from 'react-to-print';
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ErrorIcon from '@mui/icons-material/Error';
import NavBar from './Header&Footer/NavBar'
import Footer from './Header&Footer/Footer'
import AddIcon from '@mui/icons-material/Add';
import './Supplier.css'
import logo from "../Customer Management/Header&Footer/candyCloudLOGO.png"; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize:20,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const SupplierTable = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [editedSupplier, seteditedSupplier] =useState(null);
  const componentRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        alert('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      try {
        const response = await fetch("http://localhost:5000/api/suppliers");
        const data = await response.json();
        setSuppliers(data);
        setNoResult(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const filteredSupplier = suppliers.filter((supplier) =>
        Object.values(supplier).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setSuppliers(filteredSupplier);
      setNoResult(filteredSupplier.length === 0);
    }
  };
  
  const handleClear = async () => {
    setSearchQuery("");
    try {
      const response = await fetch("http://localhost:5000/api/suppliers");
      const data = await response.json();
      setSuppliers(data); 
      setNoResult(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
  else if(e.key === 'Backspace' && searchQuery === '') {
    clearSearch();
  }
};

  const handleClickOpen = async (supplierId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/suppliers/${supplierId}`);
      const data = await response.json();
      setSelectedSupplier(data);
      seteditedSupplier({ ...data });
      setOpen(true);
    } catch (error) {
      alert('Error fetching supplier data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    seteditedSupplier({
      ...editedSupplier,
      [name]: value,
    });
  };

  const handleDelete = async (supplierId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/suppliers/${supplierId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedSuppliers = suppliers.filter((supplier) => supplier._id !== supplierId);
        setSuppliers(updatedSuppliers);
      } else {
        console.error('Failed to delete supplier data');
      }
    } catch (error) {
      console.error('Error deleting supplier data:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/suppliers/${selectedSupplier._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedSupplier),
      });
      if (response.ok) {
        const updatedSuppliers = suppliers.map((supplier) =>
          supplier._id === selectedSupplier._id ? editedSupplier : supplier
        );
        setSuppliers(updatedSuppliers);
        handleClose();
      } else {
        alert('Failed to update supplier data');
      }
    } catch (error) {
      alert('Error updating supplier data:', error);
    }
  };

  return (
    <div>
      <NavBar/>
      <div className="search">
        <input onChange={(e) => setSearchQuery(e.target.value)} type="text" name="search" className="searchInput" placeholder="Search Leaves"   style={{borderRadius: '50px',padding: '10px', background:'transparent'}} onKeyDown={handleKeyDown} value={searchQuery}/>
        {searchQuery ? (
          <Button onClick={handleClear} className="clearbtn_evebtn" startIcon={<CloseIcon/>}  size="large"/>
          ):(
        <Button onClick={handleSearch} className="searchbtn_evebtn" startIcon={<SearchIcon/>}  size="larger" />
         )}
      </div>
      <div className='addSupplier'>
        <Button onClick={() => (window.location.href="/addSupplier")} startIcon={<AddIcon />} variant="contained">Add Suppliers</Button>
      </div>
      <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" ref={componentRef}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Supplier Name</StyledTableCell>
              <StyledTableCell align="center">Supplying Item</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <StyledTableRow key={supplier._id}>
                <StyledTableCell align="center">{supplier.SupplierName}</StyledTableCell>
                <StyledTableCell align="center">{supplier.SupplyingItem}</StyledTableCell>
                <StyledTableCell align="center">{supplier.Email}</StyledTableCell>
                <StyledTableCell align="center" className='buttonDE'>
                  <Stack direction="row" spacing={3}>
                    <Button variant="outlined" onClick={() => handleClickOpen(supplier._id)} startIcon={<EditIcon/>}>
                      Update
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={() => handleDelete(supplier._id)}>Delete</Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {noResult && <p className='noResult'> <ErrorIcon style={{ fontSize: '2rem' }} /> No Results </p>}
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={logo} alt="Logo" style={{ width: "100px", height: "100px" }} />
            <h1>Supplier Details Report</h1>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Supplier Name</StyledTableCell>
                  <StyledTableCell align="center">Supplying Item</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suppliers.map((supplier) => (
                  <StyledTableRow key={supplier._id}>
                    <StyledTableCell align="center">{supplier.SupplierName}</StyledTableCell>
                    <StyledTableCell align="center">{supplier.SupplyingItem}</StyledTableCell>
                    <StyledTableCell align="center">{supplier.Email}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="reportgen">
        <Box>
          <ReactToPrint
            trigger={() => (
              <Button variant="contained" color="success" startIcon={<DescriptionIcon />}>
                Generate Report
              </Button>
            )}
            content={() => componentRef.current}
            documentTitle="Customer Details Report"
            onAfterPrint={() => {
              if (setReportDownloaded(true)) {
                alert("Customer Report Successfully Downloaded !");
              }
            }}
          />
        </Box>
      </div>
      {selectedSupplier && (
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <h2>Update Details</h2>
            <DialogContentText className='dialogtxt'>
              To update the details of the Supplier, edit the details and click the Save button.
            </DialogContentText>
            <form >
              <br/>
              <label>Name : </label>
              <input autoFocus required name="SupplierName" type="text" value={editedSupplier.SupplierName} onChange={handleEditChange}/>

              <label>Supplying Item : </label>
              <input required name="SupplyingItem" type="text" defaultValue={editedSupplier.SupplyingItem} onChange={handleEditChange}/>
              
              <label>Email : </label>
              <input required name="Email" type="email" defaultValue={editedSupplier.Email} onChange={handleEditChange}/>

              <DialogActions>
                <Button onClick={handleClose} color="error" variant="contained">Cancel</Button>
                <Button color="success" variant="contained" onClick={handleSave}>Save</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <Footer/>
    </div>
  );
};

export default SupplierTable;
