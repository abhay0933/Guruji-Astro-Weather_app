"use client";

import Input from "./components/Input";
import backgroundimg from './utils/bg.avif'
import React, { useState } from "react";
import Current from "./components/Current";
import Details from "./components/Details";
import ForeCast from "./components/ForeCast";

type WeatherData = {
  current: {
    condition: {
      icon: string;
      text: string;
    };
    temp_c: number;
    wind_kph: number;
    humidity: number;
    wind_dir: string;
    pressure_mb: number;
    feelslike_f: number;
    vis_km: number;
  };
  location: {
    name: string;
    region: string;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        condition: {
          icon: string;
          text: string;
        };
        maxtemp_c: number;
        mintemp_c: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
    }[];
  };
};

const Page = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState("");

  const url = `https://api.weatherapi.com/v1/forecast.json?key=3497073a1a0d4e019c4162529243005&q=${location}&days=7&aqi=yes&alerts=yes`;

  const searchPlaces = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result: WeatherData = await response.json();
      setData(result);
      setLocation("");
      setError("");
    } catch (err) {
      setError("City Not Found");
      setData(null);
    }
  };

  let content;
  if (!data && !error) {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="text-xl font-bold mb-4">Welcome to Weather App.</h2>
        <p className="text-xl">Enter a City Name to get the Weather Forecast</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <p className="text-xl">City Not Found</p>
        <p className="text-xl">Please Enter a Valid City</p>
      </div>
    );
  } else if (data) {
    content = (
      <>
        <div className="flex md:flex-row flex-col p-12 items-center justify-between">
          <Current data={data} />
          <ForeCast data={data} />
        </div>
        <div>
          <Details data={data} />
        </div>
      </>
    );
  }

  return (
    <div className='bg-cover h-fit' style={{ backgroundImage: `url(${backgroundimg.src})` }}>
      <div className='bg-white/25 w-full flex flex-col h-fit'>
        {/* INPUT AND LOGO */}
        <div className='flex flex-col md:flex-row justify-between items-center p-12'>
          <Input searchPlaces={searchPlaces} setLocation={setLocation} />
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">Weather App</h1>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Page;
