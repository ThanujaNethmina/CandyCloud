import React, { useEffect, useState } from "react";
import "./Leave.css";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Header from "./Navbar";
import Footer from "./Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Leave = () => {
  const [leaves, setEmployeeLeaves] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [leaveData, setLeaveData] = useState(null);
  const [editedLeaveData, setEditedLeaveData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leaves");
        const data = await response.json();
        setEmployeeLeaves(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete leave record");
      }

      // Update the state to reflect the deletion
      setEmployeeLeaves(leaves.filter((leave) => leave._id !== id));
    } catch (error) {
      console.error("Error deleting leave record:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedLeaveData({
      ...editedLeaveData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/leaves/${leaveData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedLeaveData),
        }
      );
      if (response.ok) {
        // Update the customers state with the updated data
        const updatedLeaves = leaves.map((leave) =>
          leave._id === leaveData._id ? editedLeaveData : leave
        );
        setEmployeeLeaves(updatedLeaves);
        handleCloseUpdate();
      } else {
        alert("Failed to update leave data");
      }
    } catch (error) {
      alert("Error updating leave data:", error);
    }
  };

  const handleClickOpenUpdate = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/leaves/${_id}`);
      const data = await response.json();
      setLeaveData(data);
      setEditedLeaveData({ ...data });
      setOpenUpdate(true);
    } catch (error) {
      alert("Error fetching Leave data:", error);
    }
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const dateFormat = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      try {
        const response = await fetch("http://localhost:5000/api/leaves");
        const data = await response.json();
        setEmployeeLeaves(data);
        setNoResult(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      const filteredLeaves = leaves.filter((leave) =>
        Object.values(leave).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      console.log("Filtered Leaves:", filteredLeaves);
      setEmployeeLeaves(filteredLeaves);
      setNoResult(filteredLeaves.length === 0); // Set noResult based on whether there are search results
      console.log("No Result:", noResult);
    }
  };

  const handleClearSearch = async () => {
    setSearchQuery(""); // Reset the search query
    setEmployeeLeaves([]); // Clear the displayed results
    try {
      const response = await fetch("http://localhost:5000/api/leaves");
      const data = await response.json();
      setEmployeeLeaves(data); // Fetch all leaves again
      setNoResult(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const searchInput = document.querySelector(".search_input");
    if (searchInput) {
      searchInput.value = "";
    }
  };

  return (
    <>
      <Header />
      <h1>Request a Leave</h1>
      <div>
        <input
          sx={{
            float: "right",
            marginBottom: "20px",
            marginRight: "20px",
            width: "80%",
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          className="search_input"
          placeholder="Search Leaves"
        ></input>
        <Button
          sx={{
            float: "right",
            marginBottom: "20px",
            marginRight: "20px",
          }}
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Search
        </Button>
        {searchQuery && (
          <Button
            sx={{
              float: "right",
              marginBottom: "20px",
              marginRight: "20px",
            }}
            variant="contained"
            color="error"
            startIcon={<ClearIcon />}
            onClick={handleClearSearch}
          >
            Clear
          </Button>
        )}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Leave ID</StyledTableCell>
              <StyledTableCell align="center">Employee ID</StyledTableCell>
              <StyledTableCell align="center">Employee Name</StyledTableCell>
              <StyledTableCell>E-mail</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Leave Reason</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Status Reason</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave) => (
              <StyledTableRow key={leave._id}>
                <StyledTableCell>{leave.LeaveId}</StyledTableCell>
                <StyledTableCell>{leave.EmployeeID}</StyledTableCell>
                <StyledTableCell>{leave.EmployeeName}</StyledTableCell>
                <StyledTableCell>{leave.Email}</StyledTableCell>
                <StyledTableCell>{dateFormat(leave.Date)}</StyledTableCell>
                <StyledTableCell>{leave.LeaveReason}</StyledTableCell>
                <StyledTableCell>{leave.Status}</StyledTableCell>
                <StyledTableCell>{leave.StatusReason}</StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<UpdateIcon />}
                      onClick={() => handleClickOpenUpdate(leave._id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(leave._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <Box
            sx={{
              float: "right",
              marginTop: "30px",
              marginBottom: "30px",
              marginRight: "20px",
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={Link}
              to="/insert"
            >
              Add Leaves
            </Button>
          </Box>
        </div>
      </TableContainer>
      {leaveData && (
        <Dialog open={openUpdate} onClose={handleCloseUpdate}>
          <h2>Update Leave Details</h2>
          <DialogContent>
            <DialogContentText>
              To update your leave details, please edit your details accurately
              in here. The updated details will shown in the table.
            </DialogContentText>
            <form>
              <br />
              <label>Employee ID:</label>
              <input
                autoFocus
                required
                name="EmployeeID"
                type="text"
                value={editedLeaveData.EmployeeID}
                onChange={handleEditChange}
              />
              <br />
              <label>Employee Name:</label>
              <input
                required
                name="EmployeeName"
                type="text"
                value={editedLeaveData.EmployeeName}
                onChange={handleEditChange}
              />
              <br />
              <label>Email:</label>
              <input
                required
                name="Email"
                type="text"
                value={editedLeaveData.Email}
                onChange={handleEditChange}
              />
              <br />
              <label>Date:</label>
              <input
                required
                name="Date"
                type="text"
                value={dateFormat(editedLeaveData.Date)}
                onChange={handleEditChange}
              />
              <br />
              <label>LeaveReason:</label>
              <input
                required
                name="LeaveReason"
                type="text"
                value={editedLeaveData.LeaveReason}
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
                  type="submit"
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
      <Footer />
    </>
  );
};

export default Leave;
