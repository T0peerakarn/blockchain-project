import React from "react";

interface QuickMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const QuickMenuButton: React.FC<QuickMenuButtonProps> = ({ title, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className="josefin-sans p-4 py-8 mx-8 bg-[#EBBC70] text-white text-center rounded-lg shadow-md transition-all duration-150 hover:bg-[#D9A65C]"
    >
      <h2 className="text-xl">{title}</h2>
    </button>
  );
};

export default QuickMenuButton;
