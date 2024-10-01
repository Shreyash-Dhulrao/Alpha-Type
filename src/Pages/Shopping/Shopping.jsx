import React, { useState } from 'react'
import Data from './Data'

import { CaretLeft, CaretRight, AmazonLogo, ShoppingCartSimple, CaretDoubleRight, CaretDoubleLeft } from '@phosphor-icons/react';


const Shopping = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [HovLeft, setHovLeft] = useState(false)
    const [HovRight, setHovRight] = useState(false)
    const pageCount = 20;
    const startIndex = (currentPage - 1) * pageCount;

    const btnPrev = () => {
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const btnNext = () => {

        if (currentPage < Math.ceil(Data.length / pageCount)) {
            setCurrentPage(currentPage + 1);
        }
    }

    const selectedItems = Data.slice(startIndex, startIndex + pageCount);
    return (
        <div className='pt-16 bg-zinc-50 flex items-center flex-col dark:bg-zinc-700 dark:text-white'>
            <div className=' flex flex-col items-center justify-center font-Inter'>
                <header className='dark:text-white container py-4  my-3 rounded-lg'>
                    <h1 className="text-3xl font-bold text-center dark:text-white tracking-wider">Keyboards</h1>
                </header>
            </div>
            <div className='grid grid-cols-4 gap-3 flex px-10 dark:text-white overflow-y-auto'>
                {selectedItems.map((data) => {
                    return <div key={data.Klink} className='bg-zinc-200/25 overflow-hidden backdrop-blur-lg gap-1 flex flex-col dark:bg-zinc-900/25 w-full h-full transition duration-300 rounded-lg '>
                        <img src={data.kimage} alt="Keyboard Image" className='w-full bg-white h-full object-contain ' />
                        <h2 className='truncate py-3 text-xl font-Inter tracking-wide px-3'>{data.Kname}</h2>
                        <p className='text-md px-3'>Price : {(data.Kprice).toLocaleString()} /-</p>
                        <div className='flex gap-3 w-full px-3'>
                            <a href={data.Klink} target='_blank' className='w-full justify-center py-2 hover:bg-purple-500 dark:hover:bg-purple-500 my-3 rounded-lg flex items-center gap-2 transition duration-300 bg-zinc-300 text-black hover:text-white dark:text-white dark:bg-zinc-600'><AmazonLogo size={18} weight="bold" /> Amazon</a>
                        </div>
                    </div>
                })}
            </div>
                <div className='flex dark:text-white w-full items-center justify-center py-5 gap-6'>
                    <button className='items-center flex' onClick={btnPrev} disabled={currentPage === 1}><CaretLeft size={32} weight="bold" className={`${currentPage === 1 ? "text-zinc-500 opacity-60" : "" }`}/> </button>
                    <h2 className=' items-center'>{currentPage}</h2>
                    <button className='items-center flex' onClick={btnNext} disabled={currentPage === Math.ceil(Data.length / pageCount)}><CaretRight size={32} weight="bold" className={`${currentPage === Math.ceil(Data.length / pageCount) ? "text-zinc-500 opacity-60" : ""}`} /></button>
            </div>
        </div>
    )
}

export default Shopping
