import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  localStorage.setItem("userId", "66194666a02984b0db969e2f");
  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
