import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const NavList=()=>{
    return(
        <>
            <ul className='flex gap-2' >
            <li className='hover:bg-white'>
                <Link href={'/add'}>Add USer</Link>
            </li>
            <li>
                Display USer
            </li>
            </ul>
        </>
    )
}
const Navbar = () => {
  return (
    <div className='flex w-full  justify-around h-[50px] py-2 items-center bg-slate-500'>
     <Link href='/'>
      <Image src="" alt="logo"  />
     </Link>
      <NavList />
    </div>
  )
}

export default Navbar;
