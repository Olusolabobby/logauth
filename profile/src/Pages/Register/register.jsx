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
        phone: '',
        password: '',
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
                   onChange={ (e)=>setFormData(e.target.value, "username")}
                   />
                </label>
                <label> FirstName
                    <input
                        type="text" value={formValues.firstname}
                        onChange={ (e)=>setFormData(e.target.value, "firstname")}
                    />
                </label>
                <label> LastName
                    <input
                        type="text" value={formValues.lastname}
                        onChange={ (e)=>setFormData(e.target.value, "lastname")}
                    />
                </label>
                <label> Email
                    <input
                        type="email" value={formValues.email}
                        onChange={ (e)=>setFormData(e.target.value, "email")}
                    />
                </label>
                <label> Phone
                    <input
                        type="text" value={formValues.phone}
                        onChange={ (e)=>setFormData(e.target.value, "phone")}
                    />
                </label>
                <label> Password
                    <input
                        type="password" value={formValues.password}
                           onChange={ (e)=>setFormData(e.target.value, "password")}
                    />
                </label>
                <label> Address
                    <input
                        type="text" value={formValues.address}
                           onChange={ (e)=>setFormData(e.target.value, "address")}
                    />
                </label>
                <label> Country
                    <input
                        type="text" value={formValues.country}
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
