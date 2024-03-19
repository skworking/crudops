

import Link from 'next/link';
import React from 'react'
import { BsBrilliance } from "react-icons/bs";

const NavList=()=>{

    return(
        <>
            <ul className='flex gap-2' >
            <li className='hover:bg-white p-2 rounded'>
                <Link href={'/add'} className='p-2'>Add USer</Link>
            </li>
            <li className='hover:bg-white p-2 rounded'>
                <Link href={'/user-list'} className='p-2'>
                    Display USer
                </Link>
            </li>
            <li className='hover:bg-white p-2 rounded'>
                <Link href={'/excel-list'} className='p-2'>
                    Exel-CSV
                </Link>
            </li>
            <li className='hover:bg-white p-2 rounded'>
                <Link href={'/import-file'} className='p-2'>
                    Upload EXCEL
                </Link>
            </li>
            </ul>
        </>
    )
}
const Navbar = () => {
  return (
    <div className='flex w-full  justify-around h-[50px] py-2 items-center bg-slate-500'>
      <Link href='/'>
        <BsBrilliance className='fill-red-200 w-[60px] h-[40px]' />
      </Link>
      <NavList />
    </div>
  )
}

export default Navbar;
