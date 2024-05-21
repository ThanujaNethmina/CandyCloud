import React, { useState, useEffect } from "react";
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import "./DriverTable.css"

const DriverTable = () => {
    const [drivers, setDriver] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [driverData, setDriverData] = useState(null);
    const [editedDriverData, setEditedDriverData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResult, setNoResult] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5000/api/drivers");
            const data = await response.json();
            setDriver(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, []);

      const handleSearch = async () => {
        if (searchQuery.trim() === "") {
          try {
            const response = await fetch("http://localhost:5000/api/drivers");
            const data = await response.json();
            setDriver(data);
            setNoResult(false);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } else {
          const filteredDriver = drivers.filter((driver) =>
            Object.values(driver).some((field) =>
              field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
          setDriver(filteredDriver);
          setNoResult(filteredDriver.length === 0);
        }
      };

      const clearSearch = () => {
        setSearchQuery("");
        try {
          const fetchData = async () => {
            const response = await fetch("http://localhost:5000/api/drivers");
            const data = await response.json();
            setDriver(data);
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
          const response = await fetch("http://localhost:5000/api/drivers");
          const data = await response.json();
          setDriver(data); 
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
            const response = await fetch(`http://localhost:5000/api/drivers/${id}`, {
              method: "DELETE",
            });
      
            if (!response.ok) {
              throw new Error("Failed to delete driver record");
            }
      
            // Update the state to reflect the deletion
            setDriver(
              drivers.filter((driver) => driver._id !== id)
            );
            
          } catch (error) {
            console.error("Error deleting driver record:", error);
          }
        }
      };

      const handleSave = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/drivers/${driverData._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editedDriverData),
                }
            );
            if (response.ok) {
                const updatedDriver = drivers.map((driver) =>
                    driver._id === driverData._id ? editedDriverData : driver
                );
                setDriver(updatedDriver);
                handleCloseUpdate();
            } else {
                alert("Failed to update driver data");
            }
        } catch (error) {
            alert("Error updating driver data:", error);
        }
    };
    
      const handleClickOpenUpdate = async (_id) => {
        try {
          const response = await fetch(`http://localhost:5000/api/drivers/${_id}`);
          const data = await response.json();
          setDriverData(data);
          setEditedDriverData({ ...data });
          setOpenUpdate(true);
        } catch (error) {
          alert("Error fetching Driver data:", error);
        }
      };

      const handleCloseUpdate = () => {
        setOpenUpdate(false);
      };

      const handleEditChange = (e) => {
        const { name, value } = e.target;
          setEditedDriverData({
            ...editedDriverData,
            [name]: value,
          });
      };

    return (
        <div>
          <div className="search">
        <input onChange={(e) => setSearchQuery(e.target.value)} type="text" name="search" className="searchInput" placeholder="Search Driver"   style={{borderRadius: '50px',padding: '10px', background:'transparent'}} onKeyDown={handleKeyDown} value={searchQuery}/>
        {searchQuery ? (
          <Button onClick={handleClear} className="clearbtn_evebtn" startIcon={<CloseIcon/>}  size="large"/>
          ):(
        <Button onClick={handleSearch} className="searchbtn_evebtn" startIcon={<SearchIcon/>}  size="larger" />
         )}
        </div>
        <TableContainer component={Paper} sx={{ backgroundColor: '#F3E5F5' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#E1BEE7' }}>
                        <TableCell> DRIVER NAME</TableCell>
                        <TableCell> DRIVER NIC</TableCell>
                        <TableCell> DRIVER ADDRESS</TableCell>
                        <TableCell> DRIVER TEL NUMBER</TableCell>
                        <TableCell> VEHICLE TYPE</TableCell>
                        <TableCell> VEHICLE NUMBER</TableCell>
                        <TableCell align="center"> ACTION</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {drivers.map((driver) => (
                        <TableRow key={driver._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{driver.name}</TableCell>
                            <TableCell>{driver.NIC}</TableCell>
                            <TableCell>{driver.address}</TableCell>
                            <TableCell>{driver.tel_number}</TableCell>
                            <TableCell>{driver.type}</TableCell>
                            <TableCell>{driver.number}</TableCell>
                            <TableCell>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#7B1FA2', color: 'white', marginRight: '10px' }}
                                    onClick={() => handleClickOpenUpdate(driver._id)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#EF5350', color: 'white' }}
                                    onClick={() => setDeleteId(driver._id)} 
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
        {noResult && <p className='noResult'> <ErrorIcon style={{ fontSize: '2rem' }} /> No Results </p>}
        {driverData && (
            <Dialog open={openUpdate} onClose={handleCloseUpdate}>
              <h2>Update driver</h2>
              <DialogContent>
                <DialogContentText>
                  To update the driver details, please make the necessary changes below.
                </DialogContentText>
                <form>
                  <br />
                  <label>Name:</label>
                  <input
                    autoFocus
                    required
                    name="name"
                    type="text"
                    value={editedDriverData.name}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>NIC:</label>
                  <input
                    autoFocus
                    name="NIC"
                    type="text"
                    value={editedDriverData.NIC}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>Address:</label>
                  <input
                    autoFocus
                    name="address"
                    type="text"
                    value={editedDriverData.address}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>Telephone Number:</label>
                  <input
                    autoFocus
                    name="tel_number"
                    type="text"
                    value={editedDriverData.tel_number}
                    onChange={handleEditChange}
                  />
                  <br />
                  <label>Number:</label>
                  <input
                    autoFocus
                    name="number"
                    type="text"
                    value={editedDriverData.number}
                    onChange={handleEditChange}
                  />
                  <br/>
                  <label>Type:</label>
                  <input
                    autoFocus
                    name="type"
                    type="text"
                    value={editedDriverData.type}
                    onChange={handleEditChange}
                  />
    
                  <DialogActions>
                    <Button
                      onClick={handleCloseUpdate}
                      color="error"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                    <Button
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
          <Dialog
            open={deleteId !== null}
            onClose={() => setDeleteId(null)}
          >
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this driver?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteId(null)} color="primary">
                Cancel
              </Button>
              <Button onClick={() => { handleDelete(deleteId); setDeleteId(null); }} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}

export default DriverTable;