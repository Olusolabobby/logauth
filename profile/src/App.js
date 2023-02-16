import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./Pages/Home";
import {AuthContext} from "./context/AuthContext";
import {useContext} from "react";

function App() {

  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({children}) => {
      return currentUser ? children : < Navigate to = "/login" />;
  };

  console.log(currentUser);

  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path ="/" />
          <Route path="login" element={<Login />} />
          <Route index element ={<RequireAuth><Home /> </RequireAuth>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
