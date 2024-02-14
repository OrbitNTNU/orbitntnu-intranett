import React, { useState } from 'react';
import Button from '../General/Button';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import type { Member } from '@prisma/client';

interface InfoDisplayProps {
    member: Member;
    onUpdateInfo: (member: Member) => Promise<void>;
}

const EditInfoDisplay: React.FC<InfoDisplayProps> = ({ member, onUpdateInfo }) => {
    const [editedMember, setEditedMember] = useState<Member>(member);

    // Function to get the input element based on type
    const getInputElement = (label: string) => {
        const handleChange = (newValue: string | boolean | Date | number | undefined) => {
            let parsedValue: string | boolean | Date | number | undefined = newValue;
        
            if (label === 'yearOfStudy') {
                // Parse newValue as an integer for yearOfStudy
                parsedValue = newValue !==  undefined ? parseInt(newValue.toString()) : undefined;
            } else if (label === 'birthday' && typeof newValue === 'string') {
                // Parse newValue as a Date object for birthday
                parsedValue = new Date(newValue);
            }
        
            setEditedMember(prevState => ({
                ...prevState,
                [label]: parsedValue
            }));
        };

        switch (label) {
            case 'firstName':
            case 'lastName':
            case 'ntnuMail':
            case 'fieldOfStudy':
            case 'nationalities':
            case 'additionalComments':
                return (
                    <input
                        className='md:ml-2 rounded-md text-black px-2'
                        type='text'
                        defaultValue={member[label] ?? undefined}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                );
            case 'activeStatus':
                return (
                    <input
                        className='md:ml-2 w-4'
                        type='checkbox'
                        checked={editedMember[label]}
                        onChange={() => handleChange(!editedMember[label])}
                    />
                );
            case 'birthday':
                return (
                    <input
                        className='md:ml-2 text-black rounded-md px-2'
                        type='date'
                        defaultValue={editedMember[label] ? new Date(String(editedMember[label])).toISOString().split('T')[0] : ''}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                );
            case 'phoneNumber':
                return (
                    <PhoneInput
                        className='rounded-md md:ml-4 text-black'
                        style={{
                            '--PhoneInputCountryFlag-height': '1.0em', // Adjust the size as needed
                            // Add other custom styles here if needed
                        }}
                        placeholder="Enter phone number"
                        value={editedMember[label] ?? undefined}
                        onChange={handleChange}
                        defaultCountry='NO'
                        countryCallingCodeEditable={false}
                        international                   // Add required props
                    />
                );
            case 'yearOfStudy':
                return (
                    <input
                        className='md:ml-2 text-black rounded-md px-2 w-[45px]'
                        type='number'
                        defaultValue={editedMember[label] ?? undefined}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                );
            default:
                return null;
        }
    };
    
    const handleUpdateInfo = () => {
        void onUpdateInfo(editedMember);
    };

    return (
        <div>
            <h2>Member information:</h2>
            <ul className='list-disc mb-4 text-xl'>
                {Object.entries(editedMember).map(([key, value]) => {
                    const renderValueString = renderValue(value, key);
                    if (renderValueString === 'excluded') {
                        return null;
                    }
                    return (
                        <li key={key} className='flex mb-4'>
                            <div className='flex flex-col md:flex-row'>
                                <strong>{key}:</strong>
                                {getInputElement(key)}
                            </div>
                        </li>
                    );
                })}
            </ul>
            <Button label={'Save Changes'} onClick={handleUpdateInfo} />
        </div>
    );
};

const renderValue = (value: string | number | boolean | Date | null, key: string) => {
    // Exclude rendering for specified properties
    if (key === 'memberID' || key === 'userId' || key === 'slackToken' || key === 'orbitMail') {
        return 'excluded'; // Or any other value indicating exclusion
    }
    if (value instanceof Date) {
        return value.toLocaleDateString(); // or any other format you prefer
    } else {
        return value !== null ? value.toString() : 'unknown';
    }
};

export default EditInfoDisplay;
