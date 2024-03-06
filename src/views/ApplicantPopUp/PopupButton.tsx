import React, { type ReactNode } from "react";

interface ButtonProps {
    children: ReactNode,
    onClick: () => void,
}

const PopupButton = ({children, onClick}: ButtonProps) => {
    return (
        <button
            onClick={() => onClick()}
            className="m-4 p-6 rounded-lg bg-[#CBD0CC] border border-transparent hover:border-black"
        >
            {children}
        </button>
    )
}

export default PopupButton;