import React, { useEffect, useRef, useState } from "react";
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
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import ReactToPrint from "react-to-print";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ErrorIcon from '@mui/icons-material/Error';
import './CustomerTable.css';
import Navbar from './Header&Footer/NavBar';
import Footer from './Header&Footer/Footer';
import logo from "./Header&Footer/candyCloudLOGO.png"; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [editedCustomerData, setEditedCustomerData] = useState(null);
  const componentRef = useRef();
  const [reportDownloaded, setReportDownloaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        alert('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      try {
        const response = await fetch("http://localhost:5000/api/customers");
        const data = await response.json();
        setCustomers(data);
        setNoResult(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const filteredCustomer = customers.filter((customer) =>
        Object.values(customer).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setCustomers(filteredCustomer);
      setNoResult(filteredCustomer.length === 0);
    }
  };
  
  const handleClear = async () => {
    setSearchQuery("");
    try {
      const response = await fetch("http://localhost:5000/api/customers");
      const data = await response.json();
      setCustomers(data); 
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

  const handleClickOpen = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${customerId}`);
      const data = await response.json();
      setCustomerData(data);
      setEditedCustomerData({ ...data });
      setOpen(true);
    } catch (error) {
      alert('Error fetching customer data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (customerId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete account?"
    );
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${customerId}`, {
        method: 'DELETE',
      });
      if (response.ok && userConfirmed) {
        const updatedCustomers = customers.filter((customer) => customer._id !== customerId);
        setCustomers(updatedCustomers);
      } else {
        alert('Failed to delete customer data');
      }
    } catch (error) {
      alert('Error deleting customer data:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomerData({
      ...editedCustomerData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${customerData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCustomerData),
      });
      if (response.ok) {
        const updatedCustomers = customers.map((customer) =>
          customer._id === customerData._id ? editedCustomerData : customer
        );
        setCustomers(updatedCustomers);
        handleClose();
      } else {
        alert('Failed to update customer data');
      }
    } catch (error) {
      alert('Error updating customer data:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="search">
        <input onChange={(e) => setSearchQuery(e.target.value)} type="text" name="search" className="searchInput" placeholder="Search Leaves"   style={{borderRadius: '50px',padding: '10px', background:'transparent'}} onKeyDown={handleKeyDown} value={searchQuery}/>
        {searchQuery ? (
          <Button onClick={handleClear} className="clearbtn_evebtn" startIcon={<CloseIcon/>}  size="large"/>
          ):(
        <Button onClick={handleSearch} className="searchbtn_evebtn" startIcon={<SearchIcon/>}  size="larger" />
         )}
        </div>
      <TableContainer className='customerTbl' component={Paper} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table" ref={componentRef}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Password</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <StyledTableRow key={customer._id}>
                <StyledTableCell align="center">{customer.Name}</StyledTableCell>
                <StyledTableCell align="center">{customer.Age}</StyledTableCell>
                <StyledTableCell align="center">{customer.Gender}</StyledTableCell>
                <StyledTableCell align="center">{customer.Address}</StyledTableCell>
                <StyledTableCell align="center">{customer.phoneNumber}</StyledTableCell>
                <StyledTableCell align="center">{customer.Email}</StyledTableCell>
                <StyledTableCell align="center">{customer.Password}</StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={() => handleClickOpen(customer._id)} startIcon={<EditIcon/>}>Update</Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={() => handleDelete(customer._id)}>Delete</Button>
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
            <h1>Customer Details Report</h1>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Age</StyledTableCell>
                  <StyledTableCell align="center">Gender</StyledTableCell>
                  <StyledTableCell align="center">Address</StyledTableCell>
                  <StyledTableCell align="center">Phone Number</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <StyledTableRow key={customer._id}>
                    <StyledTableCell align="center">{customer.Name}</StyledTableCell>
                    <StyledTableCell align="center">{customer.Age}</StyledTableCell>
                    <StyledTableCell align="center">{customer.Gender}</StyledTableCell>
                    <StyledTableCell align="center">{customer.Address}</StyledTableCell>
                    <StyledTableCell align="center">{customer.phoneNumber}</StyledTableCell>
                    <StyledTableCell align="center">{customer.Email}</StyledTableCell>
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
      {customerData && (
        <Dialog open={open} onClose={handleClose}>
          <h2>Update Details</h2>
          <DialogContent>
            <DialogContentText>
              To update the details of the user, edit the details and click the Save button.
            </DialogContentText>
            <form>
              <br/>
              <label>Name:</label>
              <input autoFocus required name="Name" type="text" value={editedCustomerData.Name} onChange={handleEditChange} />

              <br/>
              <label>Age:</label>
              <input required name="Age" type="number" value={editedCustomerData.Age} onChange={handleEditChange} />

              <br/>
              <label>Gender:</label>
              <input required name="Gender" type="text" value={editedCustomerData.Gender} onChange={handleEditChange} />

              <br/>
              <label>Address:</label>
              <input required name="Address" type="text" value={editedCustomerData.Address} onChange={handleEditChange} />

              <br/>
              <label>Phone Number:</label>
              <input required name="phoneNumber" type="text" value={editedCustomerData.phoneNumber} onChange={handleEditChange} />

              <br/>
              <label>Email:</label>
              <input required name="Email" type="email" value={editedCustomerData.Email} onChange={handleEditChange} />

              <br/>
              <label>Password:</label>
              <input required name="Password" type="string" value={editedCustomerData.Password} readOnly  />

              <DialogActions>
                <Button onClick={handleClose} color="error" variant="contained">Cancel</Button>
                <Button onClick={handleSave} color="success" variant="contained">Save</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <Footer/>
    </div>
  );
};

export default CustomerTable;
