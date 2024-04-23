import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/theme/base.css";
import "./assets/theme/main.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import { PrimaryTheme } from './assets/theme/theme'
;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" />
    <ThemeProvider theme={PrimaryTheme}>
    <App />
    </ThemeProvider>
  </>
);


reportWebVitals();
