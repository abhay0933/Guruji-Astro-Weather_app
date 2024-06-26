import React from "react";
import { getCurrentDate } from "../func/currentDate";
import { MdLocationOn } from "react-icons/md";

interface CurrentProps {
    data: {
        current :{
            condition :{
                icon: string;
                text: string;
            }
            temp_c: number;
        }
        location :{
           name: string;
           region: string;
        }
    }
}


const Current = ({ data }: CurrentProps) => {
  const currentdate = getCurrentDate();
  const icon = data.current.condition.icon;

  return (
    <div className='flex flex-col mb-8 md:mb-0 items-start gap-2 w-1/2'>
      <div className='flex items-center'>
        <div>
          <h1 className='text-3xl text-white'>Today</h1>
          <p className='text-white'>{currentdate}</p>
        </div>
        {icon && (
          <div>
            <img src={icon} className='w-[50px] object-cover' />
          </div>
        )}
      </div>
      <div>
        <p className='text-5xl text-white'>
          {data.current.temp_c.toFixed()} <span>°C</span>
        </p>
        <span className='text-white'>{data.current.condition.text}</span>
      </div>
      <div>
        <div className='flex items-center text-black bg-white/90 rounded-xl px-2 py-2'>
            <MdLocationOn />
            <span>{data.location.name}, {data.location.region}</span>
        </div>
      </div>
    </div>
  );
};

export default Current;
