import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {signOutUser} from "../jHelpers/js-Helpers";




const Home = () => {
    const navigate = useNavigate();


    return(
        <div>
            <h1>Home</h1>
            <Link to="./profile"><button>Profile</button></Link>
            <div>
                <button type="button" onClick={signOutUser}>LogOut</button>
            </div>


        </div>
    )
}

export default Home;