import React, {useContext, useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate} from "react-router-dom"
import {AuthContext} from "../context/AuthContext";





const Login = () => {



    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {dispatch} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                dispatch({type: "LOGIN", payload:user});
                navigate("/");
            })
            .catch((error) => {
                setError(true)
            });

    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder= "Email" onChange={ e => setEmail(e.target.value)}/>
                <input type="password" placeholder= "Password" onChange={ e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                {error && <span>Wrong details!</span>}
            </form>
        </div>
    )
}

export default Login;