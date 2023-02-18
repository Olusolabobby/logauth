import {AppRoutes} from "../common/Routes";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";
import {useContext} from "react";



export const signOutUser = async (callback) => {
    try {
        const res = await signOut(auth)
        console.log(res)
        callback(AppRoutes.login)
    } catch (e){
        console.log(e);
    }
};