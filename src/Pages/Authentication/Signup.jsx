import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import assets from '../../Assets'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import { getSignUp } from '../../Firebase/Firebase'

const Signup = () => {

    const [BtnView, setBtnView] = useState(false)
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const submitForm = (e) => {
        e.preventDefault()
        console.log(Name, Email, Password)
        getSignUp(Name, Email, Password)
        setName("");
        setEmail("");
        setPassword("");
    }


    return (
        <div className='flex items-center bg-Background bg-cover bg-no-repeat justify-center min-h-screen'>
            <div className='flex w-8/12 '>
                <div className='w-1/2'>
                    <img src={assets.Authentication_Image} alt="" className='w-full' />
                </div>
                <div className='w-1/2 bg-white items-center flex flex-col justify-center px-10 '>
                    <div className='flex flex-col text-center gap-2 mb-3'>
                        <h2 className='font-Text text-5xl font-semibold'>Alpha Type</h2>
                        <p className='font-Inter text-regular opacity-70 px-14'>Your typing speed is a reflection of your thoughts—fast and clear, ready to make an impact ?</p>
                        <h2 className='font-Extras font-medium text-3xl '>Sign Up</h2>
                    </div>
                    <div className='w-full font-Inter'>
                        <form onSubmit={submitForm} className='flex flex-col w-full items-center gap-3 '>
                        <input type="text" value={Name} onChange={(e) => { setName(e.currentTarget.value) }} placeholder="Full name" className='w-full px-3 py-2 outline-none border-b-2 border-zinc-400' />
                        <input type="email" value={Email} onChange={(e) => { setEmail(e.currentTarget.value) }} placeholder="Email" className='w-full px-3 py-2 outline-none border-b-2 border-zinc-400' />
                        <div className='relative w-full overflow-hidden'>
                            <input type={BtnView ? "text" : "password"} value={Password} onChange={(e) => { setPassword(e.currentTarget.value) }} placeholder="Password" autoComplete='true' className='w-full px-3 py-2 outline-none border-b-2 border-zinc-400' />
                            <button onClick={() => { setBtnView(!BtnView) }} type='button' className='absolute right-0 top-0 py-2 px-2 overflow-hidden opacity-60'>
                                {BtnView ?
                                    <EyeClosed size={25} weight="bold" /> : <Eye size={25} weight="bold" />}
                            </button>
                        </div>
                        <button type="submit" className='bg-purple-500 hover:bg-violet-500 transition  text-white w-full py-2 rounded-3xl text-xl'>Sign Up</button>
                        </form>
                        <div className='w-full text-center flex flex-col gap-1 my-4'>
                            {/* <Link to='' className='text-purple-500'>Forgot Password</Link> */}
                            <p>Already have an Account?  <Link to='/' className='text-purple-500 px-2'>Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
