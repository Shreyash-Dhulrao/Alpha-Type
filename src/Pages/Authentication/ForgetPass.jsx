import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import {auth } from '../../Firebase/Firebase'
import { toast } from "react-toastify";

const ForgetPass = () => {
    const [Email, setEmail] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth ,  Email)
        .then(() => { toast.info("Check Email ")})
        .catch((error) => { toast.error(error.code.split('/')[1].split('-').join(" ")) });
    }

    return (
        <div className="flex items-center bg-Background  bg-cover bg-no-repeat justify-center min-h-screen">
            <div className='h-screen w-1/2 bg-white items-center flex flex-col justify-center px-10 '>
                <div className='flex flex-col text-center gap-2 mb-3'>
                    <h2 className='font-Extras font-medium text-3xl pb-2'>Forget Password ? </h2>
                </div>
                <div className='font-Inter w-full'>
                    <form onSubmit={(e)=>{submitForm(e)}} className='w-full flex flex-col items-center gap-3 '>
                        <input type="email" value={Email} onChange={(e) => { setEmail(e.currentTarget.value) }} placeholder="Email" className='w-full px-3 py-2 outline-none border-b-2 border-zinc-400' />
                        <button type="submit" className='bg-purple-500 hover:bg-violet-500 transition  text-white w-full py-2 rounded-3xl text-xl'>Next</button>
                    </form>
                    
                    <div className='w-full text-center flex flex-col gap-1 pt-2'>
                    <Link to="/" className='bg-purple-500 hover:bg-violet-500 transition  text-white w-full py-2 rounded-3xl text-xl'>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPass
