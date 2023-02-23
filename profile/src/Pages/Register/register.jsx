import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../firebase";
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import {AppRoutes} from "../../common/Routes";



const Register = () => {

    const navigate = useNavigate();

    const[formValues, setFormValues] = useState ( {
        username: '',
        firstname: '',
        lastname: '',
        role: 'user',
        email: '',
        password: '',
        phone: '',
        address: '',
        country: '',
    });

    const registerUser = async() => {
        try{
            const res = await createUserWithEmailAndPassword(
                auth,
                formValues.email,
                formValues.password
            );
            await setDoc(doc(db, "users", res.user.uid), {
                ...formValues,
                password: '',
                timeStamp: serverTimestamp()
            });
            navigate(AppRoutes.login)
        }catch(err){
            console.log(err);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser();
    }

    const setFormData = (value, key) => {
        setFormValues((prevState)=>{
            return{
                ...prevState,
                [key]: value,
            }
        });
    };



    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label> Username
                   <input
                       type="text" value={formValues.username}
                       placeholder="Username"
                   onChange={ (e)=>setFormData(e.target.value, "username")}
                   />
                </label>
                <label> First Name
                    <input
                        type="text" value={formValues.firstname}
                        placeholder="First name"
                        onChange={ (e)=>setFormData(e.target.value, "firstname")}
                    />
                </label>
                <label> Last Name
                    <input
                        type="text" value={formValues.lastname}
                        placeholder="Last name"
                        onChange={ (e)=>setFormData(e.target.value, "lastname")}
                    />
                </label>
                <label> Email
                    <input
                        type="email" value={formValues.email}
                        placeholder="Email"
                        onChange={ (e)=>setFormData(e.target.value, "email")}
                    />
                </label>
                <label> Password
                    <input
                        type="password" value={formValues.password}
                        placeholder="Password"
                           onChange={ (e)=>setFormData(e.target.value, "password")}
                    />
                </label>
                <label> Phone
                    <input
                        type="text" value={formValues.phone}
                        placeholder="Phone number"
                        onChange={ (e)=>setFormData(e.target.value, "phone")}
                    />
                </label>
                <label> Address
                    <input
                        type="text" value={formValues.address}
                        placeholder="Address"
                           onChange={ (e)=>setFormData(e.target.value, "address")}
                    />
                </label>
                <label> Country
                    <input
                        type="text" value={formValues.country}
                        placeholder="Country"
                           onChange={ (e)=>setFormData(e.target.value, "country")}
                    />
                </label>
                <button type="submit">Register</button>
            </form>
            <p>You already have an account? <Link to="/login"> Login </Link></p>

        </div>
    )
}

export default Register;
