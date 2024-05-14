import React, { useEffect, useState } from "react";
import "./Leave.css";
import { styled } from "@mui/material/styles";
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

const AdminTable = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const [editedAdminData, setEditedAdminData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admins");
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admins/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete admin record");
      }

      // Update the state to reflect the deletion
      setAdmins(admins.filter((admin) => admin._id !== id));
    } catch (error) {
      console.error("Error deleting admin record:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedAdminData({
      ...editedAdminData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admins/${adminData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedAdminData),
        }
      );
      if (response.ok) {
        // Update the customers state with the updated data
        const updatedAdmins = admins.map((admin) =>
          admin._id === adminData._id ? editedAdminData : admin
        );
        setAdmins(updatedAdmins);
        handleCloseUpdate();
      } else {
        alert("Failed to update admin data");
      }
    } catch (error) {
      alert("Error updating admin data:", error);
    }
  };

  const handleClickOpenUpdate = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admins/${_id}`);
      const data = await response.json();
      setAdminData(data);
      setEditedAdminData({ ...data });
      setOpenUpdate(true);
    } catch (error) {
      alert("Error fetching Leave data:", error);
    }
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>UserName</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>PhoneNumber</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <StyledTableRow key={admin._id}>
                <StyledTableCell>{admin.UserName}</StyledTableCell>
                <StyledTableCell>{admin.Email}</StyledTableCell>
                <StyledTableCell>{admin.pNo}</StyledTableCell>
                <StyledTableCell>{admin.Address}</StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<UpdateIcon />}
                      onClick={() => handleClickOpenUpdate(admin._id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(admin._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {adminData && (
        <Dialog open={openUpdate} onClose={handleCloseUpdate}>
          <h2>Update Admin Details</h2>
          <DialogContent>
            <DialogContentText>
              To update your admin details, please edit your details accurately
              in here. The updated details will shown in the table.
            </DialogContentText>
            <form>
              <br />
              <label>UserName:</label>
              <input
                autoFocus
                required
                name="UserName"
                type="text"
                value={editedAdminData.UserName}
                onChange={handleEditChange}
              />
              <br />
              <label>Email:</label>
              <input
                required
                name="Email"
                type="text"
                value={editedAdminData.Email}
                onChange={handleEditChange}
              />
              <br />
              <label>Phone Number:</label>
              <input
                required
                name="pNo"
                type="text"
                value={editedAdminData.pNo}
                onChange={handleEditChange}
              />
              <br />
              <label>Address:</label>
              <input
                required
                name="Address"
                type="text"
                value={editedAdminData.Address}
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
    </div>
  );
};

export default AdminTable;
