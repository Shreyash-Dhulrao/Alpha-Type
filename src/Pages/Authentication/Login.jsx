import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import assets from '../../Assets'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import { getSignIn } from '../../Firebase/Firebase'

const Login = () => {
    const [BtnView, setBtnView] = useState(false)
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = (e) => {
        e.preventDefault()
        getSignIn(Email, password);
    }

    return (
        <div className="flex items-center bg-Background bg-cover bg-no-repeat justify-center min-h-screen">
            <div className='flex w-8/12 '>
                <div className='w-1/2'>
                    <img src={assets.Authentication_Image} alt="" className='w-full' />
                </div>
                <div className='w-1/2 bg-white items-center flex flex-col justify-center px-10 '>
                    <div className='flex flex-col text-center gap-2 mb-3'>
                        <h2 className='font-Text text-5xl font-semibold'>Alpha Type</h2>
                        <p className='font-Inter text-regular opacity-70 px-14'>Your typing speed is a reflection of your thoughts—fast and clear, ready to make an impact ?</p>
                        <h2 className='font-Extras font-medium text-3xl pb-2'>Sign In</h2>
                    </div>
                    <div className='font-Inter w-full'>
                        <form onSubmit={submitForm} className='w-full flex flex-col items-center gap-3 '>
                        <input type="email" value={Email} onChange={(e)=>{setEmail(e.currentTarget.value)}} placeholder="Email" className='w-full px-3 py-2 outline-none border-b-2 border-zinc-400' />
                        <div className='relative w-full overflow-hidden'>
                        <input type={BtnView ? "text" : "password"} autoComplete='true' value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}} placeholder="Password" className='w-full px-3 py-2 outline-none border-b-2 border-zinc-400' />
                        <button onClick={() => {setBtnView(!BtnView) }} type='button' className='absolute right-0 top-0 py-2 px-2 overflow-hidden opacity-60'>
                            {BtnView ? 
                                <EyeClosed size={25} weight="bold" /> : <Eye size={25} weight="bold" /> }
                        </button>
                        </div>
                        <button type="submit" className='bg-purple-500 hover:bg-violet-500 transition  text-white w-full py-2 rounded-3xl text-xl'>Login</button>
                        
                        </form>

                        <div className='w-full text-center flex flex-col gap-1 pt-2'>
                        <Link to='/Forget' className='text-purple-500'>Forgot Password</Link>
                        <p>Don't have an Account?  <Link to='/Signup' className='text-purple-500 px-2'>Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
