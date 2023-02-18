import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./Pages/Home";
import {AuthContext} from "./context/AuthContext";
import {useContext} from "react";
import Profile from "./Pages/Profile";
import Register from "./Pages/register";
import {AppRoutes} from "./common/Routes";

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

          <Route path={AppRoutes.login} element={<Login />} />
          <Route path={AppRoutes.register} element={<Register />} />
          <Route path={AppRoutes.home} element={<RequireAuth><Home /> </RequireAuth>} />
          <Route path={AppRoutes.profile} element= {<RequireAuth><Profile /> </RequireAuth>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
