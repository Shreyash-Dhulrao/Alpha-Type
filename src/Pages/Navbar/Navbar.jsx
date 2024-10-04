import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { newContextValue } from '../../Context/Theme';
// import keyB from './styling material/Favicon (2).png'
// import MySvg from '../../Assets/Images/Icon.svg?react'
import { auth } from '../../Firebase/Firebase';
import {getSignOut } from '../../Firebase/Firebase'
import assets from '../../Assets'
import { SunDim, MoonStars , List , X,Basket, ShoppingCartSimple , BookOpenText , SignOut } from '@phosphor-icons/react';
// import { ReactComponent as Cart } from './styling material/Cart.svg'

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [ThemeStat, setThemeStat] = useState(false)
    const { Theme, darkTheme, lightTheme } = newContextValue()

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const ThemeCall =()=>{
    if(userPrefersDark.matches){
      darkTheme();
      setThemeStat(true)
    }
    else{
      lightTheme();
      setThemeStat(false)
    }
  }

  useEffect(() => {
    ThemeCall()
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (event) => {
            if (event.matches) {
                darkTheme();
                setThemeStat(true)
            } else {
                lightTheme();
                setThemeStat(false)
            }
        };

        // Add listener
        mediaQuery.addEventListener('change', handleChange);

        // Clean up the listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
  }, [])

    const onChangeBtn = (e) => {
        // e.preventDefault();
        let checking = e.currentTarget.checked
        if (checking) {
            darkTheme()
            setThemeStat(true)
        }
        else {
            lightTheme()
            setThemeStat(false)
        }
    }

    const LogOut=()=> {
        // Function to prevent the user from navigating back after logout
        function preventBack() {
          window.history.pushState(null, '/', window.location.href);
          window.onpopstate = function () {
            window.history.pushState(null, '/home', window.location.href);
          };
        }
    
        // Logout the user
        getSignOut(auth).then(() => {
            preventBack()
        })
      }
    

    return (
        <nav className="z-10 bg-zinc-100/25 dark:bg-zinc-800/50 fixed w-screen  backdrop-blur-xl  drop-shadow-lg dark:text-white font-Inter tracking-wide transition duration-300 ease-in-out">
            <div className={` flex justify-between items-center dark:bg-zinc-800/50 `}>
                <div className='flex gap-3'>
                    <Link to="/home" className="flex items-center gap-3 font-Text px-10">
                        {/* <MySvg className="text-black dark:text-white " width='80px' /> */}
                        {ThemeStat ? <img src={assets.Icon2 } className="" width='30px'  /> : <img src={assets.Icon1 } className="" width='30px'  />}
                        <p className='text-3xl'>Alpha Type</p>
                    </Link>
                </div>
                <div className="hidden lg:flex lg:items-center text-center px-14 lg:space-x-10">
                    <ul className="flex items-center space-x-7">
                        <li><input type='checkbox' className='hidden' onChange={onChangeBtn} checked={Theme === "dark"} id='ThemeBTN' />
                            <label htmlFor="ThemeBTN" >
                                <div className='border border-zinc-600 dark:border-zinc-400 p-1 rounded-3xl'>
                                    {ThemeStat ? <SunDim size={26} weight="regular" /> : <MoonStars size={26} weight="regular" />}
                                </div>
                            </label>
                        </li>
                        <li >
                            <div className="mx-auto flex relative items-center justify-center">
                                <div className="group relative cursor-pointer ">

                                    <div className="flex">
                                        <p className="menu-hover flex gap-2 text-zinc-600 hover:text-black hover:opacity-100 dark:text-zinc-300 opacity-70 py-5 dark:hover:opacity-100 dark:hover:text-zinc-50 transition duration-100" >
                                        <BookOpenText size={20} weight="bold" />
                                            Learnings
                                        </p>
                                    </div>

                                    <div className="invisible absolute w-full bg-zinc-200 dark:bg-zinc-600 flex flex-col py-2 group-hover:visible">

                                        <Link className={`my-2 hover:font-semibold md:mx-2 font`} to="/Basics">
                                            Basic
                                        </Link>

                                        <Link className={`my-2  hover:font-semibold  md:mx-2 font`} to="/Normal">
                                            Normal
                                        </Link>
                                        <Link className={`my-2 hover:font-semibold md:mx-2 font`} to="/Advance">
                                            Advance
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </li>
                        <li><Link to="/Shopping" className="flex gap-2 text-zinc-600 hover:text-black hover:opacity-100 dark:text-zinc-300 opacity-70 py-5 dark:hover:opacity-100 dark:hover:text-zinc-50 transition duration-310">
                        <Basket size={20} weight="bold" />
                        Shopping</Link></li>
                        <li>
                            <button onClick={LogOut} className='flex gap-2 text-zinc-600 hover:text-black hover:opacity-100 dark:text-zinc-300 opacity-70 py-5 dark:hover:opacity-100 dark:hover:text-zinc-50 transition duration-310'>
                            <SignOut size={20} weight="bold" />
                                Logout</button>
                        </li>
                        {/* <li><Link to="/Shopping" ><Cart className={`text-${props.text}`} width='22px' /></Link></li> */}

                    </ul>
                </div>
                <div className="lg:hidden flex">
                    <input type='checkbox' className='hidden' onChange={onChangeBtn} checked={Theme === "dark"} id='ThemeBTN' />
                    <label htmlFor="ThemeBTN" >
                        <div className='bg-zinc-200 dark:bg-zinc-600 p-3 mx-4'>
                            {ThemeStat ? <SunDim size={20} weight="regular" /> : <MoonStars size={20} weight="regular" />}
                        </div>
                    </label>

                    <button className="text-gray-800 focus:outline-none text-black dark:text-white  " onClick={toggleNavbar}>
                    {isOpen ? <X size={20} weight="regular"  /> : <List size={20} weight="regular"  />  }
                    </button>
                </div>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden flex h-fill justify-center text-center w-full absolute ps-2/4 dark:bg-zinc-700 bg-zinc-200  `}>
                <ul>
                    <li className="py-2 px-4 border-b border-gray-200 ">
                        <h2 className={`my-2 block font-regular  font-semibold text-${props.text} hover:text-${props.text2} md:mx-2 font`}>Learnings</h2>

                        <Link className={`my-2 block font-regular  hover:font-semibold text-${props.text} hover:text-${props.text2} md:mx-2 font`} to="/Basics">
                            Basic
                        </Link>

                        <Link className={`my-2  block font-regular  hover:font-semibold  text-${props.text} hover:text-${props.text2} md:mx-2 font`} to="/Intermediate">
                            Intermediate
                        </Link>
                        <Link className={`my-2 block font-regular  hover:font-semibold text-${props.text} hover:text-${props.text2} md:mx-2 font`} to="/Advance">
                            Advance
                        </Link>

                    </li>
                    <li className="py-2 px-4 border-b border-gray-200">
                        <Link to="/" className={`block text-${props.text} links`}>Dashboard</Link>
                    </li>
                    <li className="py-2 px-4 border-b border-gray-200">
                        <Link to="/" className={`block text-${props.text} links`}>Help</Link>
                    </li>
                    <li className="py-2 px-4">
                        <Link to="/profile" className={`block text-${props.text} links`}>Profile</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
