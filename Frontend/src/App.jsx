import './App.css';
import AppRoutes from './routes';

function App() {
  //need set  login user id
  localStorage.setItem("userId","66194666a02984b0db969e2f")
  return (
   <>
        <AppRoutes />
   </>
  );
}

export default App;
