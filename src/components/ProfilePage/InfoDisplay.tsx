import React from 'react';

interface InfoDisplayProps {
    label: string;
    value: string;
    full: boolean;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ label, value, full }) => {
    if (value) {
        return (
            <ul className='list-disc mb-4'>
                <li>
                    <strong>{label}:</strong> {value}
                </li>
            </ul>
        );

    } else {
        return full && (
            <ul className='list-disc mb-4'>
                <li>
                    <strong>{label}:</strong> {"Unknown"}
                </li>
            </ul>
        );
    }
};

export default InfoDisplay;
