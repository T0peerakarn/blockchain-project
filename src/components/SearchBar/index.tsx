import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  ...inputProps
}) => {
  return (
    <div className="flex items-center w-full bg-[#EDEDED] rounded-lg p-3 border border-[#EDEDED] focus-within:bg-white focus-within:border-blue-500 transition-all duration-150">
      <FiSearch className="text-gray-500 mr-2" />
      <input
        {...inputProps}
        type="text"
        placeholder={placeholder}
        className="bg-[#EDEDED] flex-grow outline-none text-gray-700 focus:bg-white transition-all duration-150"
      />
    </div>
  );
};

export default SearchBar;
