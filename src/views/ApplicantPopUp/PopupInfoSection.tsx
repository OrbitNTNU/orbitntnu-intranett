import React from "react";

interface InfoProps {
    title: string,
    info: string,
}

const PopupInfoSection = ({title, info}: InfoProps) => {
    return (
        <div>
            <p className="font-bold">
                {title}
            </p>
            <div className="ml-4 whitespace-pre-line">
                {info}
            </div>
        </div>
    )
}

export default PopupInfoSection;