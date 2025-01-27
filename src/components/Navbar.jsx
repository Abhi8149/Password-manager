import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-slate-700'>
      <nav className='flex justify-around p-2 '>
        <h1 className='text-3xl'>
            <span className='text-black'>Pass</span>
            <span className='text-green-500'>OP</span>
            </h1>
        <ul className='flex gap-10 mx-3 cursor-pointer'>
            <li className='hover:font-bold'>Home</li>
            <li className='hover:font-bold'>About</li>
            <li className='hover:font-bold'>Contact us</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
