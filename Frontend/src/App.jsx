import { useState } from "react";

import "./App.css";
import CreateAccount from './components/Customer/CreateAccount'
import Footer from './components/Customer Management/Header&Footer/Footer'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {<CreateAccount/>}
      {/*<CustomerTable/>*/}
      <Footer/>
    </>
  );
}

export default App;
