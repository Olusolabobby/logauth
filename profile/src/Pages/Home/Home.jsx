import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {signOutUser} from "../../jHelpers/js-Helpers";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";


const Home = () => {
    const navigate = useNavigate();
    const authUser = JSON.parse(localStorage.getItem ('user'))?.userInfo

    useEffect( ()=> {
        console.log(authUser);
        const docRef = doc(db, "users");
        onSnapshot(docRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            console.log(data);
        })
    }, [])

    return(
        <div>
            <h1>Home</h1>
            <Link to="./profile2"><button>Profile</button></Link>
            <div>
                <button type="button" onClick={() => signOutUser(navigate)}>LogOut</button>
            </div>


        </div>
    )
}

export default Home;