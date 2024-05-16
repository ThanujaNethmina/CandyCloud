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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import DescriptionIcon from "@mui/icons-material/Description";
import ReactToPrint from 'react-to-print';
import Stack from '@mui/material/Stack';
import './CustomerTable.css'
import Navbar from './Header&Footer/NavBar'
import Footer from './Header&Footer/Footer';
import logo from './Header&Footer/candyCloudLOGO.png'; // import your logo

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

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/feedbacks');
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        alert('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handleApprove = async (feedbackId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/feedbacks/${ feedbackId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Approved' }),
      });
      if (response.ok) {
        const updatedFeedbacks = feedbacks.map((feedback) =>
          feedback._id === feedbackId ? { ...feedback, Status: 'Approved' } : feedback
        );
        setFeedbacks(updatedFeedbacks);
      } else {
        alert('Failed to approve feedback');
      }
    } catch (error) {
      alert('Error approving feedback', error);
    }
  };

  const handleReject = async (feedbackId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/feedbacks/${feedbackId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Rejected' }),
      });
      if (response.ok) {
        const updatedFeedbacks = feedbacks.map((feedback) =>
          feedback._id === feedbackId ? { ...feedback, Status: 'Rejected' } : feedback
        );
        setFeedbacks(updatedFeedbacks);
      } else {
        alert('Failed to reject feedback');
      }
    } catch (error) {
      alert('Error rejecting feedback', error);
    }
  };

  return (
    <div>
        <Navbar/>
      <TableContainer className='customerTbl' component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" ref={componentRef}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Customer Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Rating</StyledTableCell>
              <StyledTableCell align="center">Feedback Message</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((feedback) => (
              <StyledTableRow key={feedback._id}>
                <StyledTableCell align="center">{feedback.CustomerName}</StyledTableCell>
                <StyledTableCell align="center">{feedback.Email}</StyledTableCell>
                <StyledTableCell align="center">{feedback.Rating}</StyledTableCell>
                <StyledTableCell align="center">{feedback.Feedback}</StyledTableCell>
                <StyledTableCell align="center">{feedback.Status}</StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="success" startIcon={<CheckIcon/>} onClick={() => handleApprove(feedback._id)}>Accept</Button>
                    <Button variant="outlined" color="error" startIcon={<CloseIcon/>} onClick={() => handleReject(feedback._id)}>Reject</Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="reportgen">
        <Box>
          <ReactToPrint
            trigger={() => (
              <Button variant="contained" color="success" startIcon={<DescriptionIcon/>}>
                Generate Report
              </Button>
            )}
            content={() => componentRef.current}
            documentTitle="Feedback Details Report"
            onAfterPrint={() => {
              alert("Feedback Detail Report Successfully Downloaded !");
            }}
          />
        </Box>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
            <h1>Feedback Details Report</h1>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Customer Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Rating</StyledTableCell>
                  <StyledTableCell align="center">Feedback Message</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <StyledTableRow key={feedback._id}>
                    <StyledTableCell align="center">{feedback.CustomerName}</StyledTableCell>
                    <StyledTableCell align="center">{feedback.Email}</StyledTableCell>
                    <StyledTableCell align="center">{feedback.Rating}</StyledTableCell>
                    <StyledTableCell align="center">{feedback.Feedback}</StyledTableCell>
                    <StyledTableCell align="center">{feedback.Status}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default FeedbackTable;
