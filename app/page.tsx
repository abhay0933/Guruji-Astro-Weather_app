"use client";

import Input from "./components/Input";
import backgroundimg from './utils/photo-1592210454359-9043f067919b.avif'
import React, { useState } from "react";
import Current from "./components/Current";
import Details from "./components/Details";
import ForeCast from "./components/ForeCast";
import { log } from "console";


const page = () => {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState("");

  // 
  
  
  const url = `http://api.weatherapi.com/v1/forecast.json?key=3497073a1a0d4e019c4162529243005&q=${location} &days=7&aqi=yes&alerts=yes`;

  const searchPlaces = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    //  console.log('hello');

    console.log(data);
     
     try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
      setLocation("");
      setError("");
    }catch (err) {
      setError("City Not Found");
      setData({});
    }
    };

    let content;
    if(Object.keys(data).length === 0 && error === "") {
       content = (
        <div className="text-white text-center h-screen mt-[5rem]">
          <h2 className="text-xl font-bold mb-4">Welcome to Weather App.</h2>
          <p className="text-xl">Enter a City Name to get the Weather Forecast</p>
        </div>
       )
    }
    else if(error != "") {
      content = (
        <div className="text-white text-center h-screen mt-[5rem]">
        <p className="text-xl">City Not Found</p>
        <p className="text-xl">Please Enter a Valid City</p>
        </div>
      )
    }else{
      content = (
       <>
        <div className="flex md:flex-row flex-col p-12 items-center justify-between">
            <Current data = {data}/>
            <ForeCast data= {data}/>
        </div>
        <div>
          <Details data= {data}/>
        </div>
       </>
      )
    }


  
  return (
    <div className='bg-cover  h-fit ' style={{ backgroundImage: `url(${backgroundimg.src})` }}>
      <div className='bg-white/25 w-full flex flex-col h-fit'>
        {/* INPUT AND LOGO */}
        <div className='flex flex-col md:flex-row justify-between items-center p-12'>
          <Input searchPlaces={searchPlaces} setLocation={setLocation}/>
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">Weather App</h1>
        </div>
        {content}
      </div>
    </div>
  );
};

export default page;
