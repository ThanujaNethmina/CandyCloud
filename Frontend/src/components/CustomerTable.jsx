import React, { useEffect, useState } from 'react';
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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import './CustomerTable.css';


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

const CustomerTable = ({CustomerId}) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [open, setOpen] = React.useState(false);
  
  const [customerData, setCustomerData] = useState(null);
  const handleClickOpen = async (CustomerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${CustomerId}`);
      const data = await response.json();
      // Set the customer data to state to populate the form fields
      setCustomerData(data);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${customerId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Filter out the deleted customer from the list
        const updatedCustomers = customers.filter((customer) => customer._id !== customerId);
        setCustomers(updatedCustomers);
      } else {
        console.error('Failed to delete customer data');
      }
    } catch (error) {
      console.error('Error deleting customer data:', error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" className='tableCustomer'>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Password</StyledTableCell>
              <StyledTableCell align="center">...</StyledTableCell>
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
                <StyledTableCell align="right" className='buttonDE'>
                    <Stack direction="row" spacing={3}>
                        <React.Fragment>
                            <Button variant="outlined" onClick={() => handleClickOpen(customer._id)} startIcon={<EditIcon/>}>
                                Update
                            </Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                component: 'form',
                                style: {
                                    backgroundColor: 'white',
                                    boxShadow: 'none',
                                  },
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    console.log(formJson);
                                    handleClose();
                                },
                                }}
                            >
                                <h2>Update Details</h2>
                                    <DialogContent>
                                    <DialogContentText className='dialogtxt'>
                                        To update the details of the user, edit the details and click the Save button.
                                    </DialogContentText>
                                        
                                        <form onSubmit={(event) => {
                                            event.preventDefault();
                                            const formData = new FormData(event.currentTarget);
                                            const formJson = Object.fromEntries(formData.entries());
                                            console.log(formJson);
                                            handleClose();
                                        }}>
                                            <br/>
                                            <lable>Name : </lable>
                                            <input
                                            autoFocus
                                            required
                                            name="Name"
                                            type="text"
                                            defaultValue={customerData ? customerData.Name : ''}
                                            />
                                            <lable>Age : </lable>
                                            <input
                                            required
                                            name="Age"
                                            type="number"
                                            defaultValue={customerData ? customerData.Age : ''}
                                            />
                                            <lable>Gender : </lable>
                                            <input
                                            required
                                            name="Gender"
                                            type="text"
                                            defaultValue={customerData ? customerData.Gender : ''}
                                            />
                                            <lable>Address : </lable>
                                            <input
                                            required
                                            name="Address"
                                            type="text"
                                            defaultValue={customerData ? customerData.Address : ''}
                                            />
                                            <lable>Phone Number : </lable>
                                            <input
                                            required
                                            name="phoneNumber"
                                            type="text"
                                            defaultValue={customerData ? customerData.phoneNumber : ''}
                                            />
                                            <lable>Email : </lable>
                                            <input
                                            required
                                            name="Email"
                                            type="email"
                                            defaultValue={customerData ? customerData.Email : ''}
                                            />
                                            <lable>Password : </lable>
                                            <input
                                            required
                                            name="Password"
                                            type="string"
                                            defaultValue={customerData ? customerData.Password : ''}
                                            />
                                            <DialogActions>
                                            <Button onClick={handleClose} variant="outlined">Cancel</Button>
                                            <Button type="submit" color="success" variant="outlined">Save</Button>
                                            </DialogActions>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </React.Fragment>
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={()=>handleDelete(customer._id)}>Delete</Button>
                    </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomerTable;
