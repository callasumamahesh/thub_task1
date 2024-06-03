import React, { useState } from 'react'
import LoadingSpinner from './Loading'
import Link from 'next/link'
import Stars from './useStars'

function Products({data,loading}) {
    // const [loading,setLoading] = useState(false)
  return (
    <main>
         {loading ? <LoadingSpinner /> : 
        <section className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {data.map((item, i) => (
            <Link className="m-4" key={i} href={{
              pathname: '/single-product',
              query: { item: JSON.stringify(item) }
            }}>
              <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] flex flex-col justify-center rounded-[10px] items-center hover:bg-gray-300 border-4 p-2 cursor-pointer">
                <img className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]" src={item.image} alt='ProductImage' />
                <p className="text-center md:p-2 p-[6px]">{item.title.slice(0, 10)}</p>
                <p className="text-center md:p-2 p-[6px] font-bold">{`$ ${item.price}`}</p>
                <p className="text-center"><Stars className="font-size-[1rem] bg-yellow-500" rating={item.rating.rate} /></p>
              </div>
            </Link>
          ))}
        </section>
      }
    </main>
  )
}

export default Products