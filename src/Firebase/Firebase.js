
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc , orderBy , query , where, setDoc } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , sendPasswordResetEmail } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBTpwuhYO7x-fUFsXGJASHT_xkUeG5ELpM",
  authDomain: "typing-portal-e77c8.firebaseapp.com",
  databaseURL: "https://typing-portal-e77c8-default-rtdb.firebaseio.com",
  projectId: "typing-portal-e77c8",
  storageBucket: "typing-portal-e77c8.appspot.com",
  messagingSenderId: "172750505881",
  appId: "1:172750505881:web:1553dd5ff00cb6d05b7508",
  measurementId: "G-FJBYVJKGPD"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const getSignUp = async (name, email, password) =>{
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "New Users" , user.uid), {
      id: user.uid,
      name: name.toLowerCase(),
      email,
    });
    await setDoc(doc(db, "TypingSpeed" , user.uid), {
    })
    await setDoc(doc ())
    toast.success("User created successfully!");
    
  } catch (err) {
    toast.error(err.code.split('/')[1].split('-').join(" "));
  }
}

const getSignIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("User signed in successfully!");
    
  } catch (err) {
    toast.error(err.code.split('/')[1].split('-').join(" "));
  }
}

const getSignOut = async () => {
  try {
    await signOut(auth);
    toast.success("User signed out successfully!");
    
  } catch (err) {
    toast.error(err.code.split('/')[1].split('-').join(" "));
    console.log(err);
    console.log(err);
  }
}

export { db, collection, addDoc, getDocs, deleteDoc, doc , orderBy , query , where , getSignUp, auth , getSignIn , getSignOut , sendPasswordResetEmail };