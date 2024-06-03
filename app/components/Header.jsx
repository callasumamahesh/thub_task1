'use client'
import { useRouter } from 'next/navigation';
import React from 'react'


function Header() {
  const router = useRouter();
  const handleHome = () => {
    console.log('Goto page.js');
    router.push('/')
  }

  return (
    <div className=' m-auto mt-2 flex justify-evenly items-center'>
      <h1 className='cursor-pointer' onClick={() => handleHome()}>Home</h1>
      <h1>Take What You Like</h1>
      <div className="flex gap-2">
        <button className='p-3 bg-slate-400 w-[100px] text-white rounded-[10px] cursor-pointer'>Sign In</button>
        <button className='p-3 bg-slate-400 w-[100px] text-white rounded-[10px] cursor-pointer'>Sign Out</button>
      </div>
    </div>

  )
}

export default Header

// {/* {loading ? <Loading /> : 
//         <div className="flex flex-wrap justify-center items-center">
//           {data.map((item, i) => (
//             <Link className="m-4" key={i} href={{
//               pathname: '/single-product',
//               query: { item: JSON.stringify(item) }
//             }}>
//               <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] flex flex-col justify-center rounded-[10px] items-center hover:bg-gray-300 border-4 p-2 cursor-pointer">
//                 <img className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]" src={item.image} />
//                 <p className="text-center md:p-2 p-[6px]">{item.title.slice(0, 10)}</p>
//                 <p className="text-center md:p-2 p-[6px] font-bold">{`$ ${item.price}`}</p>
//                 <p className="text-center"><Stars className="font-size-[1rem] bg-yellow-500" rating={item.rating.rate} /></p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       } */}