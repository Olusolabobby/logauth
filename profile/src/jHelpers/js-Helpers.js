import {AppRoutes} from "../common/Routes";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";



export const signOutUser = async (callback) => {
    try {
        const res = await signOut(auth)
        // console.log(res)
        localStorage.removeItem('user');
        callback(AppRoutes.login)
    } catch (e){
        console.log(e);
    }
};