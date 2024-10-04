import React from 'react'
import { IconBrandInstagram , IconBrandGithub , IconBrandLinkedin} from '@tabler/icons-react';

const Footer = () => {
  return (
    <div className='bg-zinc-900 w-full py-3 text-white font-Inter '>
      <div className='flex flex-col items-center text-lg gap-3'>
        <p>Created By: <b className='text-purple-500 font-Text'>Shreyash Dhulrao</b></p>
        <div className='flex group'>
        <a href="/">
        <IconBrandInstagram stroke={2} className='border-b-2 hover:text-purple-500 hover:border-purple-500 border-transparent text-white m-2 pb-2 transition-group duration-300 ease-in-out ' size={40} /> 
        </a>
        <a href="/">
        <IconBrandGithub stroke={2} className='border-b-2 hover:text-purple-500 hover:border-purple-500 border-transparent text-white m-2 pb-2 transition-group duration-300  ease-in-out' size={40}/>
        </a>
        <a href="/">
        <IconBrandLinkedin stroke={2} className='border-b-2 hover:text-purple-500 hover:border-purple-500 border-transparent text-white m-2 pb-2 transition-group duration-300 ease-in-out ' size={40}/>
        </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
