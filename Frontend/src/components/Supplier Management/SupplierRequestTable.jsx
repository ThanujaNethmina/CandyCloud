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
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import moment from 'moment'
import NavBar from './Header&Footer/NavBar'
import Footer from './Header&Footer/Footer'
import './Supplier.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height:50,
    fontSize:16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
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

const SupplierInventoryTable = (item) => {
  const [requestedItems, setRequestedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editedRequest, seteditedRequest] =useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Raw_Materials');
        const data = await response.json();
        setRequestedItems(data);
      } catch (error) {
        alert('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleClickOpen = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/Raw_Materials/${itemId}`);
      const data = await response.json();
      setSelectedRequest(data);
      seteditedRequest({ ...data });
      setOpen(true);
    } catch (error) {
      alert('Error fetching raw material:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    seteditedRequest({
      ...editedRequest,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/Raw_Materials/${selectedRequest._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedRequest),
      });
      if (response.ok) {
        const updatedItems = requestedItems.map((item) =>
          item._id === selectedRequest._id ? editedRequest : item
        );
        setRequestedItems(updatedItems);
        handleClose();
      } else {
        alert('Failed to add supplier detais');
      }
    } catch (error) {
      alert('Error updating supplier details:', error);
    }
  };

  const dateFormat=(date)=>{
    return moment(date).format('DD/MM/YYYY')
  }

  const calculateTotal = (item) => {
    const quantity = parseFloat(item.Quantity);
    const unit = parseFloat(item.value);

    const totalPrice = quantity * unit;

    return totalPrice;
  };

  return (
    <div>
      <NavBar/>
      <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Required Item</StyledTableCell>
              <StyledTableCell align="center">Quantity(kg)</StyledTableCell>
              <StyledTableCell align="center">Supplier Name</StyledTableCell>
              <StyledTableCell align="center">Unit Price(Rs.)</StyledTableCell>
              <StyledTableCell align="center">Manufecture Date</StyledTableCell>
              <StyledTableCell align="center">Expire Date</StyledTableCell>
              <StyledTableCell align="center">Total Price(Rs.)</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestedItems.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell align="center">{item.product_name}</StyledTableCell>
                <StyledTableCell align="center">{item.Quantity}</StyledTableCell>
                <StyledTableCell align="center">{item.SupplierName}</StyledTableCell>
                <StyledTableCell align="center">{item.value}</StyledTableCell>
                <StyledTableCell align="center">{dateFormat(item.Manufactured_date)}</StyledTableCell>
                <StyledTableCell align="center">{dateFormat(item.Expired_date)}</StyledTableCell>
                <StyledTableCell align="center">{calculateTotal(item)}</StyledTableCell>
                <StyledTableCell align="center" className='buttonDE'>
                  <Stack direction="row" spacing={3}>
                    <Button variant="outlined" onClick={() => handleClickOpen(item._id)} startIcon={<EditIcon/>}>
                      Add Supplying Details
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRequest && (
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <h2>Add Supplier Details</h2>
            <DialogContentText className='dialogtxt'>
              Add Supplying details to hear...
            </DialogContentText>
            <form>
              <br/>
              <label>Required Item : </label>
              <input
                autoFocus
                required
                name="RequiredItem"
                type="text"
                defaultValue={editedRequest.product_name}
                readOnly
              />
              <label>Quantity(kg) : </label>
              <input
                required
                name="Quantity"
                type="text"
                defaultValue={editedRequest.Quantity}
                readOnly
              />
              <label>Supplier Name : </label>
              <input
                required
                name="SupplierName"
                type="text"
                defaultValue={editedRequest.SupplierName}
                onChange={handleEditChange}
              />
              <label>Unit Price(Rs.) : </label>
              <input
                required
                name="value"
                type="number"
                defaultValue={editedRequest.value}
                onChange={handleEditChange}
              />
              <label>Manufacture Date : </label>
              <input
                required
                name="Manufactured_date"
                type="date"
                defaultValue={dateFormat(editedRequest.Manufactured_date)}
                onChange={handleEditChange}
              />
              <label>Expired Name : </label>
              <input
                required
                name="Expired_date"
                type="date"
                defaultValue={dateFormat(editedRequest.Expired_date)}
                onChange={handleEditChange}
              />
              <DialogActions>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button onClick={handleSave} color="success" variant="outlined">Save</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <Footer/>
    </div>
  );
};

export default SupplierInventoryTable;