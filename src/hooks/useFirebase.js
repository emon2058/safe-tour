import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,onAuthStateChanged,updateProfile,getIdToken,signOut } from "firebase/auth";
import initializeFirebase from '../Pages/Login/Firebase/firebase.init';

// initialize firebase app 
initializeFirebase();

const useFirebase = () => {
    const [user,setUser] = useState({});
    const [loading,setLoading] =useState(true)
    const [authError,setAuthError] = useState('');
    const [admin,setAdmin] = useState(false)
    const [token,setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email,password,name,history)=>{
      setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setAuthError('');
      // Signed in 
      const newUser = {email,displayName: name};
      setUser(newUser)
      saveUser(email,name,'POST')
      updateProfile(auth.currentUser,{
        displayName: name
      })
      .then(()=>{
        //Profile updated
      })
      .catch((error)=>{
        setAuthError(error.message)
      });
      history.replace('/')
    })
    .catch((error) => {
      setAuthError(error.message);
    })
    .finally(()=>setLoading(false));
  }
  
  const loginUser = (email,password,location,history)=>{
      setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
        const destination = location?.state?.from || '/';
        history.replace(destination);
        setAuthError('');
     })
     .catch((error) => {
     setAuthError(error.message);
     })
     .finally(()=>setLoading(false));
  }
  const googleLogin = (history,location)=>{
    setLoading(true);
        signInWithPopup(auth, googleProvider)
          .then((result) => {
            const destination = location?.state?.from || '/';
            history.replace(destination);
            setAuthError('');
            // The signed-in user info.
            const user = result.user;
            saveUser(user.email,user.displayName,'PUT')
            setAuthError('');
            // ...
        }).catch((error) => {
            setAuthError(error.message);
        })
        .finally(()=>setLoading(false))
  }
  // insert and update  user to database
    const saveUser = (email,displayName,method)=>{
      const user = {email,displayName};
      fetch('http://localhost:5000/users',{
        method:method,
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(user)
      })
      .then()
    }
  // observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            getIdToken(user)
            .then(idToken=>{
                setToken(idToken);
            })
        } else {
            setUser({})
        }
        setLoading(false);
    });
    return () => unsubscribed;
}, [auth])

// check admin is true or false 
  useEffect(()=>{
    fetch(`http://localhost:5000/users/${user.email}`)
    .then(res => res.json())
    .then(data => setAdmin(data.admin))
  },[user.email])

const logout = () => {
    setLoading(true);
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    })
      .finally(() => setLoading(false));
}  
    return {
        user,
        admin,
        token,
        loading,
        authError,
        registerUser,
        loginUser,
        googleLogin,
        logout,
    }
};

export default useFirebase;