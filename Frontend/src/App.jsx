import { useState } from "react";

import "./App.css";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeList from "./components/EmployeeList";
import EmployeeLeave from "./components/EmployeeLeave";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <EmployeeLeave />
    </>
  );
}

export default App;
