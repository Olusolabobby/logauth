import {createContext, useEffect, useReducer} from "react";
import AuthReducer from "./AuthReducer";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";

const INITIAL_STATE = {
    // currentUser: true
    currentUser: JSON.parse(localStorage.getItem("user")) || null
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect( ()=> {
        const collectionRef = collection(db, "users");
        onSnapshot(collectionRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            // console.log(data);
            const authUser = data?.filter((user)=> user?.id === state?.currentUser?.uid)
            // console.log(authUser)
            // console.log({...state?.currentUser,
            //     role : authUser[0]?.role})
            localStorage.setItem("user", JSON.stringify({...state?.currentUser,
            userInfo : authUser?.[0]}))

            !state.currentUser?.userInfo
                && authUser?.[0]
            && dispatch({type: "LOGIN", payload:{...state.currentUser,
                    userInfo : authUser?.[0]}});
        })
    }, [state.currentUser]);

    return(
        <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
