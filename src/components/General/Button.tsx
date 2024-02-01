import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode; // Updated the icon type
}

const Button = ({ label, onClick, icon }: ButtonProps) => (
  <button
    className="bg-blue-600 font-bold py-2 px-4 md:max-w-64 hover:bg-blue-800 flex items-center justify-center rounded-md"
    onClick={onClick}
  >
    {icon && <div className="mr-2">{icon}</div>} {/* Render the icon if it is defined */}
    {label}
  </button>
);

export default Button;