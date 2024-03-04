"use client"

import Link from "next/link";

const Home=()=> {
 return(
  <div>
    <h1>User</h1>
    <Link href={'/add'}>Add</Link>
  </div>
 )
 
}
export default Home;