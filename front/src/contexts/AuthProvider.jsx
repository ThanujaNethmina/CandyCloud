//manage pros we uses those contexts-AuthContext is a context used here for managing authentication-related state and functions
//AuthProvider.jsx file helps to manage user authentication in one place.It keeps whether a user is logged in or not (user state),
//it provides functions to create accounts(sign up), log in, log out, and update user profiles

import React, { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext=createContext({ user: null });
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider;

const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    
    //create an account
    const createUser=(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //sign up with gmail 
    const signUpWithGmail=()=>{
        return signInWithPopup(auth, googleProvider)
    }

    //login using email and password
    const login=(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    //logout
    const logout = () => {
        signOut(auth).then(() => {
            alert("You have been logged out. Would you like to login or create an account?");
        }).catch((error) => {
            console.log(error);
        });
    }

    //update profile
    const updateuserProfile=({name,photoURL})=>{
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          })
    }

    //check user signed-in(log in) or not
    //useEffect hook uses the code is checking whether a user is logged in or not by listening to authentication state changes.
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (currentuser) => {
            if (currentuser) {
              setUser(currentuser);{/*if the user is signed in, the setUser function updates the user state with the current user's information*/}
              setLoading(false)//loading state to false-the authentication state has been determined.
            } else {
              // User is signed out
              // ...
            }
          })
          return ()=>{
            return unsubscribe();
          }
    },[])


    const authInfo={
        user,
        createUser,
        signUpWithGmail,
        login,
        logout,
        updateuserProfile
    }
    return(
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
