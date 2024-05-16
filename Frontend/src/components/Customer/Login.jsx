import React, { useState } from "react";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import Footer from "../Customer Management/Header&Footer/Footer";

const Login = () => {
  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Move this line up to avoid re-renders

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/customers/login1", loginData)
      .then((result) => {
        console.log(result);
        if (result.data == "Success") {
          navigate("/homepageorder");
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        // Error occurred during login process, display error message
        setError("Error logging in:", error.message);
      });
  };

  return (
    <div>
      <div className="containerSign">
        <div className="header">
          <div className="text">Sign In</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <EmailIcon color="disabled" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="Email"
              onChange={handleChange}
              value={loginData.Email}
              required
            />
          </div>
          <div className="input">
            <VpnKeyIcon color="disabled" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="Password"
              onChange={handleChange}
              value={loginData.Password}
              required
            />
          </div>
        </div>
        <button type="submit" onClick={handleSubmit} className="createAcc">
          {" "}
          Login{" "}
        </button>

        <div>
          <p className="no-acc">
            Haven't Account?{" "}
            <span className="no-acc-reg" onClick={() => navigate("/")}>
              Create Account
            </span>
          </p>
        </div>
        <div>
          <p className="no-acc">
            Admin Account{" "}
            <span
              className="no-acc-reg"
              onClick={() => navigate("/adminlogin")}
            >
              Login to Admin Account
            </span>
          </p>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
