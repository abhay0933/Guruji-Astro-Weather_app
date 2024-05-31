"use client";
import { FaSearch } from "react-icons/fa";
import { ChangeEvent, FormEvent } from "react";

interface InputProps {
  searchPlaces: (event: FormEvent<HTMLFormElement>) => void;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ searchPlaces, setLocation }: InputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  return (
    <form onSubmit={searchPlaces} className="flex items-center md:w-2/4 w-full order-2 md:order-1">
      <input
        type="text"
        placeholder="Search Your City"
        className="w-full bg-transparent border-b-2 placeholder-white outline-none text-white"
        onChange={handleInputChange}
      />
      <button type="submit" className="ml-[-25px] text-white cursor-pointer">
        <FaSearch />
      </button>
    </form>
  );
};

export default Input;
