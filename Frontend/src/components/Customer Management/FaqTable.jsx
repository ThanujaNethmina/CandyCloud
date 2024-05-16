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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import './CustomerTable.css'
import Navbar from './Header&Footer/NavBar';
import Footer from './Header&Footer/Footer';

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

const FaqTable = () => {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(false);
  const [faqData, setFaqData] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/faqs');
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        alert('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleClickOpen = async (faqId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/faqs/${faqId}`);
      const data = await response.json();
      setFaqData(data);
      setOpen(true);
    } catch (error) {
      alert('Error fetching FAQs', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setFaqData({
      ...faqData,
      Answer: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/faqs/${faqData._id}`, {
        Answer: faqData.Answer,
      });
      if (response.status === 200) {
        const updatedFaqs = faqs.map((faq) =>
          faq._id === faqData._id ? { ...faq, Answer: faqData.Answer } : faq
        );
        setFaqs(updatedFaqs);
        setAlertOpen(true);
        setOpen(false);
      } else {
        throw new Error(`Failed to add answer: ${response.statusText}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <div>
      <Navbar />
      <TableContainer className='customerTbl' component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Customer Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Question Type</StyledTableCell>
              <StyledTableCell align="center">Question</StyledTableCell>
              <StyledTableCell align="center">Answer</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faqs.map((faq) => (
              <StyledTableRow key={faq._id}>
                <StyledTableCell align="center">{faq.CustomerName}</StyledTableCell>
                <StyledTableCell align="center">{faq.Email}</StyledTableCell>
                <StyledTableCell align="center">{faq.Pno}</StyledTableCell>
                <StyledTableCell align="center">{faq.QuestionType}</StyledTableCell>
                <StyledTableCell align="justify">{faq.Question}</StyledTableCell>
                <StyledTableCell align="justify">{faq.Answer}</StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={() => handleClickOpen(faq._id)} startIcon={<EditIcon />}>
                      Give Answer
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(faq._id)}>Delete</Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {faqData && (
        <Dialog open={open} onClose={handleClose}>
          <h2>Answer to the Question</h2>
          <DialogContent>
            <DialogContentText>
              If the question is necessary, give an answer to it.
            </DialogContentText>
            <form>
              <br />
              <label>Question Type:</label>
              <input required name="QuestionType" type="text" value={faqData.QuestionType} readOnly />
              <br />
              <label>Question:</label>
              <input required name="Question" type="text" value={faqData.Question} readOnly />
              <br />
              <label>Answer:</label>
              <input required name="Answer" type="text" value={faqData.Answer} onChange={handleAnswerChange} />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error" variant="contained">Cancel</Button>
            <Button onClick={handleSubmit} color="success" variant="contained">Save</Button>
            <Alert icon={<CheckIcon />} severity="success" style={{ display: alertOpen ? '' : 'none' }} className='alert' >
              Answered to the question successfully..!
            </Alert>
          </DialogActions>
        </Dialog>
      )}
      <Footer />
    </div>
  );
};

export default FaqTable;
