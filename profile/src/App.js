import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login/Login";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./Pages/Home/Home";
import {AuthContext} from "./context/AuthContext";
import {useContext} from "react";
import AdminProfile from "./Pages/Profile/AdminProfile";
import Register from "./Pages/Register/register";
import {AppRoutes} from "./common/Routes";
import UserProfile from "./Pages/Profile/UserProfile";

function App() {

  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({children}) => {
      return currentUser ? children : < Navigate to = "/login" />;
  };

  console.log(currentUser);

  // const RequireNonAuth = ({children}) => {
  //   return currentUser?.uid ? < Navigate to = "/" /> : children
  // };


  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path={AppRoutes.login} element={<Login /> } />
          <Route path={AppRoutes.register} element={<Register />} />
          <Route path={AppRoutes.home} element={<RequireAuth><Home /> </RequireAuth>} />
          <Route path={AppRoutes.adminProfile} element= {<RequireAuth><AdminProfile /> </RequireAuth>} />
          <Route path={AppRoutes.userProfile} element= {<RequireAuth><UserProfile /> </RequireAuth>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
