import React from "react";
import Icons from "./Icons";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: string;
}

const Button = ({ label, onClick, icon }: ButtonProps) => (
  <button
    className="bg-gradient-to-r from-cyan-500 to-blue-500 font-bold py-2 px-4 md:max-w-64 hover:bg-blue-800 flex items-center justify-center rounded-md"
    onClick={onClick}
  >
    {icon &&
      <div className="mr-2">
        <Icons name={icon} />
      </div>} {/* Render the icon if it is defined */}
    {label}
  </button>
);

export default Button;