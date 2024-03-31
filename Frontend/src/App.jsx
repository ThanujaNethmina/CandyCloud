import { useState } from "react";

import "./App.css";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <EmployeeList />
    </>
  );
}

export default App;
