import React, { useState, useEffect, useRef } from "react";
import "./Delivery.css";
import ReactToPrint from "react-to-print";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, Paper, Table, TableBody, TableContainer, TableHead, Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import DescriptionIcon from "@mui/icons-material/Description";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import "./DeliveryTable.css"
import logo from "../Customer Management/Header&Footer/candyCloudLOGO.png"; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 20,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

// Define StyledTableRow using styled from @mui/material/styles
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DeliveryTable = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [deliveryData, setDeliveryData] = useState(null);
    const [editedDeliveryData, setEditedDeliveryData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResult, setNoResult] = useState(false);
    const componentRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5000/api/deliveries");
            const data = await response.json();
            setDeliveries(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, []);

      const handleSearch = async () => {
        if (searchQuery.trim() === "") {
          try {
            const response = await fetch("http://localhost:5000/api/deliveries");
            const data = await response.json();
            setDeliveries(data);
            setNoResult(false);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } else {
          const filteredDelivery = deliveries.filter((delivery) =>
            Object.values(delivery).some((field) =>
              field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
          setDeliveries(filteredDelivery);
          setNoResult(filteredDelivery.length === 0);
        }
      };

      const clearSearch = () => {
        setSearchQuery("");
        try {
          const fetchData = async () => {
            const response = await fetch("http://localhost:5000/api/deliveries");
            const data = await response.json();
            setDeliveries(data);
            setNoResult(false);
          };
          fetchData();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      
      const handleClear = async () => {
        setSearchQuery("");
        try {
          const response = await fetch("http://localhost:5000/api/deliveries");
          const data = await response.json();
          setDeliveries(data); 
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

      const handleDelete = async (id) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        
        // If user confirms deletion
        if (isConfirmed) {
          try {
            const response = await fetch(`http://localhost:5000/api/deliveries/${id}`, {
              method: "DELETE",
            });
      
            if (!response.ok) {
              throw new Error("Failed to delete delivery record");
            }
      
            // Update the state to reflect the deletion
            setDeliveries(deliveries.filter((delivery) => delivery._id !== id));
            
          } catch (error) {
            console.error("Error deleting delivery record:", error);
          }
        }
      };

      const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedDeliveryData({
          ...editedDeliveryData,
          [name]: value,
        });
      };

      const handleSave = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/deliveries/${deliveryData._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(editedDeliveryData),
            }
          );
          if (response.ok) {
            const updatedDeliveries = deliveries.map((delivery) =>
              delivery._id === deliveryData._id ? { ...delivery, ...editedDeliveryData } : delivery
            );
            setDeliveries(updatedDeliveries);
            handleCloseUpdate();
          } else {
            alert("Failed to update delivery data");
          }
        } catch (error) {
          console.error("Error updating delivery data:", error);
          alert("Error updating delivery data");
        }
      };
    
      const handleClickOpenUpdate = async (_id) => {
        try {
          const response = await fetch(`http://localhost:5000/api/deliveries/${_id}`);
          const data = await response.json();
          setDeliveryData(data);
          setEditedDeliveryData({ ...data });
          setOpenUpdate(true);
        } catch (error) {
          console.error("Error fetching delivery data:", error);
          alert("Error fetching delivery data");
        }
      };

      const handleCloseUpdate = () => {
        setOpenUpdate(false);
      };

    return (
      <div>
      <div className="search">
    <input onChange={(e) => setSearchQuery(e.target.value)} type="text" name="search" className="searchInput" placeholder="Search Delivery"   style={{borderRadius: '50px',padding: '10px', background:'transparent'}} onKeyDown={handleKeyDown} value={searchQuery}/>
    {searchQuery ? (
      <Button onClick={handleClear} className="clearbtn_evebtn" startIcon={<CloseIcon/>}  size="large"/>
      ):(
    <Button onClick={handleSearch} className="searchbtn_evebtn" startIcon={<SearchIcon/>}  size="larger" />
     )}
    </div>
        <TableContainer component={Paper} sx={{ backgroundColor: '#F3E5F5' /* purple */ }}>
            <Table ref={componentRef}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#E1BEE7' /* pink */ }}>
                        <TableCell> ITEM ID</TableCell>
                        <TableCell> CUSTOMER ADDRESS</TableCell>
                        <TableCell> CUSTOMER EMAIL</TableCell>
                        <TableCell> TRACKING CODE</TableCell>
                        <TableCell> DRIVER NAME</TableCell>
                        <TableCell> VEHICLE TYPE</TableCell>
                        <TableCell> VEHICLE NUMBER</TableCell>
                        <TableCell> CURRENT LOCATION</TableCell> {/* Added current location */}
                        <TableCell> ACTION</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {deliveries.map((delivery) => (
                        <TableRow key={delivery._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{delivery.itemId}</TableCell>
                            <TableCell>{delivery.customerAddress}</TableCell>
                            <TableCell>{delivery.customerEmail}</TableCell>
                            <TableCell>{delivery.trackingCode}</TableCell>
                            <TableCell>{delivery.name}</TableCell>
                            <TableCell>{delivery.vehicleType}</TableCell>
                            <TableCell>{delivery.vehicleNumber}</TableCell>
                            <TableCell>{delivery.currentLocation}</TableCell> {/* Display current location */}
                            <TableCell>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    sx={{ margin: '0px 10px', backgroundColor: '#7B1FA2', color: 'white' /* purple */ }}
                                    onClick={() => handleClickOpenUpdate(delivery._id)}
                                >
                                    Update
                                </Button>
                                <Button
                                    sx={{ margin: '0px 10px', backgroundColor: '#EF5350', color: 'white' /* red */ }}
                                    onClick={() => handleDelete(delivery._id)}
                                >
                                    Delete
                                </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
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
                        <StyledTableCell align="center">ITEM ID</StyledTableCell>
                        <StyledTableCell align="center">CUSTOMER ADDRESS</StyledTableCell>
                        <StyledTableCell align="center">CUSTOMER EMAIL</StyledTableCell>
                        <StyledTableCell align="center">TRACKING CODE</StyledTableCell>
                        <StyledTableCell align="center">DRIVER NAME</StyledTableCell>
                        <StyledTableCell align="center">VEHICLE TYPE</StyledTableCell>
                        <StyledTableCell align="center">VEHICLE NUMBER</StyledTableCell>
                        <StyledTableCell align="center">CURRENT LOCATION</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deliveries.map((delivery) => (
                        <StyledTableRow key={delivery._id}>
                          <StyledTableCell align="center">{delivery.itemId}</StyledTableCell>
                          <StyledTableCell align="center">{delivery.customerAddress}</StyledTableCell>
                          <StyledTableCell align="center">{delivery.customerEmail}</StyledTableCell>
                          <StyledTableCell align="center">{delivery.trackingCode}</StyledTableCell>
                          <StyledTableCell align="center">{delivery.name}</StyledTableCell>
                          <StyledTableCell align="center">{delivery.vehicleType}</StyledTableCell>
                          <StyledTableCell align="center">{delivery.vehicleNumber}</StyledTableCell>
                          <StyledTableCell align="center">{delivery.currentLocation}</StyledTableCell>
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
            {noResult && <p className='noResult'> <ErrorIcon style={{ fontSize: '2rem' }} /> No Results </p>}
        {deliveryData && (
            <Dialog open={openUpdate} onClose={handleCloseUpdate}>
              <h2>Update Delivery Details</h2>
              <DialogContent>
                <DialogContentText>
                  To approve the leave, please update about the approval and mention
                  the reason if only needed in here. The updated details will shown
                  in the table and also to the relevant employee.
                </DialogContentText>
                <form>
                  <br />
                  <label>Item Id:</label>
                  <input
                    autoFocus
                    required
                    name="itemId"
                    type="text"
                    value={editedDeliveryData.itemId}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>Customer Address:</label>
                  <input
                    autoFocus
                    name="customerAddress"
                    type="text"
                    value={editedDeliveryData.customerAddress}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>Customer Email:</label>
                  <input
                    autoFocus
                    name="customerEmail"
                    type="text"
                    value={editedDeliveryData.customerEmail}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>Tracking Code:</label>
                  <input
                    autoFocus
                    name="trackingCode"
                    type="text"
                    value={editedDeliveryData.trackingCode}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>Driver Name:</label>
                  <input
                    autoFocus
                    name="name"
                    type="text"
                    value={editedDeliveryData.name}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>Vehicle Type:</label>
                  <input
                    autoFocus
                    name="vehicleType"
                    type="text"
                    value={editedDeliveryData.vehicleType}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>Vehicle Number:</label>
                  <input
                    autoFocus
                    name="vehicleNumber"
                    type="text"
                    value={editedDeliveryData.vehicleNumber}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>Current Location:</label> {/* Added current location */}
                  <input
                    autoFocus
                    name="currentLocation"
                    type="text"
                    value={editedDeliveryData.currentLocation}
                    onChange={handleEditChange}
                  />
                  <br />
    
                  <DialogActions>
                    <Button
                      onClick={handleCloseUpdate}
                      color="error"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      color="success"
                      variant="contained"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
          )}
          </div>
    );
}

export default DeliveryTable
