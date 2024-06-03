"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import Stars from '../components/useStars';
import LoadingSpinner from '../components/Loading';
import Link from 'next/link';

function page() {
  const searchParams = useSearchParams();
  const totalItems = searchParams.get('item')
  const totalItemsParse = JSON.parse(totalItems)
  const [similarCategory, setSimilarCategory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/category/${totalItemsParse.category}`);
      const data = await res.json()
      const filterData = data.filter((item) => item.id != totalItemsParse.id)
      setSimilarCategory(filterData)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className='w-full flex flex-col overflowy-hidden'>
      <main className='w-full flex md:flex-row p-[2rem] flex-col'>
        <section className='w-full md:w-3/5 flex flex-col gap-[1rem] p-3'>
          <h1 className='text-[20px] font-bold'>{totalItemsParse.title}</h1>
          <p>{totalItemsParse.description}</p>
          <Stars rating={totalItemsParse.rating.rate} />
          <p className='font-bold'>${totalItemsParse.price}</p>
          <div className='flex gap-[1rem]'>
            <button className='w-[150px] p-[10px] bg-gray-400 text-white rounded-[6px]'>Add to Cart</button>
            <button className='w-[150px] p-[10px] bg-gray-400 text-white rounded-[6px]'>Buy Now</button>
          </div>
        </section>
        <section className='sm:w-full md:w-2/5 flex justify-center'>
          <img className='w-[300px] h-[300px] float-center' src={totalItemsParse.image} />
        </section>

      </main>
      <section>
      <h1 className='font-bold text-center'>Similar Category</h1>
      {loading ? <LoadingSpinner /> : 
        <main className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {similarCategory.map((item, i) => (
            <Link className="m-4" key={i} href={{
              pathname: '/single-product',
              query: { item: JSON.stringify(item) }
            }}>
              <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-[10px] flex flex-col justify-center items-center hover:bg-gray-300 border-4 p-2 cursor-pointer" >
                <img className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]" src={item.image} alt='ProductImage'/>
                <p className="text-center md:p-2 p-[6px]">{item.title.slice(0, 10)}</p>
                <p className="text-center md:p-2 p-[6px] font-bold">{`$ ${item.price}`}</p>
                <p className="text-center"><Stars className="font-size-[1rem] bg-yellow-500" rating={item.rating.rate} /></p>
              </div>
            </Link>
          ))}
        </main>
      }
      </section>
    </div>
  )
}

export default page