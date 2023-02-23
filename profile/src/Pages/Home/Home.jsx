import {Link, useNavigate} from "react-router-dom";
import React, {useState}  from "react";
import {setFormData, signOutUser} from "../../jHelpers/js-Helpers";
import {doc, onSnapshot, setDoc} from "firebase/firestore";
import {db} from "../../firebase";

import {useEffect} from "react";



const Home = () => {
    const navigate = useNavigate();

    const authUser = JSON.parse(localStorage.getItem ('user'))?.userInfo
    const users = JSON.parse(localStorage.getItem ('users'))
    console.log(authUser); //picks Auth user from local storage in AuthContext cos its realtime listener


    return(
        <div>
            <h1>Home</h1>
            {authUser?.role === "admin" && <Link to="./profile2">
                <button>Profile</button>
            </Link>}

            <div>
                <button type="button" onClick={() => signOutUser(navigate)}>LogOut</button>
            </div>


            {authUser && (<div>
                <h2>Information</h2>
                <p>{authUser?.firstname} {authUser?.lastname}</p>
                <p>{authUser?.username} </p>
                <label>Role: {authUser?.role}</label>
                <p>{authUser?.email} </p>
                <p>{authUser?.phone} </p>
                <p>{authUser?.address} </p>
                <p>{authUser?.country} </p>
                {authUser?.imageUrl && <img src={authUser.imageUrl} alt="" style={{width: "100px"}}/>}

                <button > Edit</button>

            </div>)
            }



        </div>
    )
}

export default Home;