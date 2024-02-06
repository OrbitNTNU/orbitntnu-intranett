import React, { useState } from 'react';
import Button from '../General/Button';
import InfoDisplay from './InfoDisplay';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'

type MemberInfo = {
    label: string;
    value: string | null; // Adjust the types based on actual data types
    type: string;
};

interface EditInfoDisplayProps {
    memberInfo: MemberInfo[];
    onUpdateInfo: (label: string, value: string) => void;
}

const EditInfoDisplay: React.FC<EditInfoDisplayProps> = ({ memberInfo, onUpdateInfo }) => {
    const [editableValues, setEditableValues] = useState<MemberInfo[]>(memberInfo);

    const handleInputChange = (label: string, newValue: string) => {
        setEditableValues((prevValues) => ({ ...prevValues, [label]: newValue }));
    };

    const handleUpdateInfo = () => {
        Object.entries(editableValues).forEach(([label, value]) => {
            onUpdateInfo(label, value);
        });

        // Clear editable values after updating
        setEditableValues({});
    };

    const [value, setValue] = useState();
    console.log(value);

    return (
        <>
            <div className='ml-4'>
                {memberInfo.map((info) => (
                    <div key={info.label}>
                        <div className='flex flex-row'>
                            <InfoDisplay label={info.label} value={info.value} full={true} />
                            {info.type === "phone" ? (
                                <PhoneInput
                                    className='rounded-md mb-4 ml-4 text-black'
                                    style={{
                                        '--PhoneInputCountryFlag-height': '1.0em', // Adjust the size as needed
                                        // Add other custom styles here if needed
                                    }}
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={setValue}
                                    defaultCountry='NO'
                                    countryCallingCodeEditable={false}
                                    international
                                />
                            ) : (
                                <input
                                    className='rounded-md mb-4 ml-4 text-black'
                                    id={info.label}
                                    name={info.label}
                                    type={info.type}
                                    defaultValue={info.value}
                                />
                            )}

                        </div>
                    </div>
                ))}
            </div>
            <>
                {Object.keys(editableValues).length > 0 && (
                    <Button label={'Save Changes'} onClick={handleUpdateInfo} />
                    // <button onClick={handleUpdateInfo} className='bg-blue-500 text-white px-4 py-2'>
                    //     Save Changes
                    // </button>
                )}
            </>
        </>
    );
};

export default EditInfoDisplay;
