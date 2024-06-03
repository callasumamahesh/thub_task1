'use client';
import React, { useState, useEffect } from 'react';
import Stars from './components/useStars';
import { IoMdMenu } from "react-icons/io";
import Products from './components/Products';
import Header from './components/Header';

function App() {
  const [loading, setLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(12);
  const [price, setPrice] = useState();
  const [name, setName] = useState('');
  const [searchAppear, setSearchAppear] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [navbar, setNavBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        if(productsCount >= 20){
          setProductsCount(20)
        }
        else{
          setProductsCount((prev) => prev + 5);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [productsCount]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products?limit=${productsCount}`);
      const res = await response.json();
      setData(res);
      setData1(res);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleSelect = (e) => {
    const selectedRating = e.target.value;
    const newData = data1.filter((item) => Math.floor(item.rating.rate) === Number(selectedRating));
    setData(newData);
  };

  const handleFilterByPrice = () => {
    if (price === '') {
      alert('Please Enter Price');
    } else {
      const newData = data1.filter((item) => item.price < price);
      setData(newData);
      setPrice('')
    }
  };

  const handleFilterByName = () => {  
      if(name===''){

      } 
      else{
        const newSearchItem = name;
        const newSearchList = [...searchList, newSearchItem];
        setSearchList(newSearchList);
      }
  };

  const handleFocus = () => {
    setSearchAppear(true);
  };

  const handleDebouncing = (enteredProduct) => {
    const newData = data1.filter((item) =>
      item.title.toLowerCase().includes(enteredProduct.toLowerCase())
    );
    setData(newData);
  };

  const handleSearch = (e) => {
    setName(e.target.value);
    setTimeout(() => {
      handleDebouncing(e.target.value);
    }, 500);
  };

  const handleCategory = async (category) => {
    setLoading(true);
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const res = await response.json();
    setData(res);
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-[1rem] mt-[1rem] items-center md:hidden">
        <span onClick={() => setNavBar(!navbar)}><IoMdMenu /></span>
        <span className="m-2 text-center font-bold">Select Your Item</span>
      </div>
      {/* <Header navbar = {navbar} setData = {setData} setLoading = {setLoading} /> */}
      <section className={`${navbar ? 'block' : 'hidden'} md:block w-full flex gap-[2rem] justify-center flex-col items-center`}>
        <main className="w-full h-auto flex flex-col justify-center items-center mb-3">
          <h1 className="hidden md:block m-2 text-center font-bold">Select your Item</h1>
          <ul className="w-3/4 p-3 bg-gray-400 rounded-[1rem] gap-2 cursor-pointer flex justify-evenly text-white items-center h-auto sm:flex flex-col md:flex-row">
            <li onClick={() => fetchData()}>All Products</li>
            <li onClick={() => handleCategory("men's clothing")}>Men's Clothing</li>
            <li onClick={() => handleCategory("women's clothing")}>Women's Clothing</li>
            <li onClick={() => handleCategory("electronics")}>Electronics</li>
            <li onClick={() => handleCategory("jewelery")}>Jewelery</li>
          </ul>
        </main>

        <main className="items-center w-full flex flex-col md:items-start gap-[1rem] md:flex-row justify-evenly">
          <select onChange={handleSelect} className="border-2 h-[50px] p-2">
            <option value="1" name="1Star"><Stars rating={1} /></option>
            <option value="2" name="2Stars"><Stars rating={2} /></option>
            <option value="3" name="3Stars"><Stars rating={3} /></option>
            <option value="4" name="4Stars"><Stars rating={4} /></option>
            <option value="5" name="5Stars"><Stars rating={5} /></option>
          </select>

          <section className="flex flex-col" onFocus={handleFocus} onBlur={() => { setSearchAppear(false); handleFilterByName() }}>
            <div className="flex">
              <input type="text" onChange={handleSearch} placeholder="Enter Product Name" className="p-2 border-2 border-black-900 w-[200px] outline-none" />
            </div>

            <div className="w-full flex justify-center">
              {searchList.length > 0 && searchAppear &&
                <div className="mt-[1rem] bg-gray-100 w-full h-auto max-h-[200px] overflow-y-auto rounded-[10px]">
                  {searchList.map((item, i) => (
                    <div key={i} className="flex gap-[20px] cursor-pointer hover:bg-white m-1 rounded-10px">
                      <p className="m-2 p-2 text-center">{item}</p>
                    </div>
                  ))}
                </div>
              }
            </div>
          </section>
          <div className="flex">
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" className="p-2 border-2 w-[200px] outline-none" />
            <button onClick={handleFilterByPrice} className="ml-3 text-white w-[100px] h-[40px] bg-gray-500 rounded-[10px]">Search</button>
          </div>
        </main>
      </section>
      <Products data={data} loading={loading}/>
    </div>
  );
}

export default App;
