import Homepage from './Pages/HomePage/Homepage'
import { ContextProvider } from './Context/Theme';
import { Route, Routes, BrowserRouter as Router, useNavigate , useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import Navbar from './Pages/Navbar/Navbar';
import Signup from './Pages/Authentication/Signup';
import Login from './Pages/Authentication/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/Firebase';
import ForgetPass from './Pages/Authentication/ForgetPass';
import { PublicRoute, PrivateRoute } from './Pages/Authentication/PublicRoute';
import { SignOut } from '@phosphor-icons/react';
import Basics from './Pages/Learnings/Basics'
import Normal from './Pages/Learnings/Normal'
import Advance from './Pages/Learnings/Advance'
import Shopping from './Pages/Shopping/Shopping';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation()


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const lastPage = localStorage.getItem('lastPage');
        if (lastPage) {
          navigate(lastPage);
        } else {
          navigate("/home");
        }
      } else {
        setUser(null);
        navigate('/');
      }
      localStorage.removeItem('lastPage');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('lastPage', location.pathname); // Save current page
    }
  }, [location, user]);

  const [Theme, setTheme] = useState("light");

  const darkTheme = () => {
    setTheme('dark');
  }

  const lightTheme = () => {
    setTheme('light');
  }

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark")
    document.querySelector("html").classList.add(Theme)
  }, [Theme])

  return (
    <ContextProvider value={{ Theme, darkTheme, lightTheme }}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PublicRoute user={user}><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute user={user}><Signup /></PublicRoute>} />
        <Route path="/signout" element={<PublicRoute><SignOut /></PublicRoute>} />
        <Route path="/forget" element={<PublicRoute user={user}><ForgetPass /></PublicRoute>} />

        <Route path="/home" element={<PrivateRoute user={user}><Navbar /><Homepage /></PrivateRoute >} />
        <Route path="/Shopping" element={<PrivateRoute user={user}><Navbar /><Shopping /></PrivateRoute >} />
        <Route path="/Basics" element={<PrivateRoute user={user}><Navbar /><Basics /></PrivateRoute >} />
        <Route path="/Normal" element={<PrivateRoute user={user}><Navbar /><Normal /></PrivateRoute >} />
        <Route path="/Advance" element={<PrivateRoute user={user}><Navbar /><Advance /></PrivateRoute >} />
      </Routes>
    </ContextProvider>
  )
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
