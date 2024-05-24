import React, { useEffect, useState } from 'react';
import Button from '../General/Button';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import type { Member } from '@prisma/client';
import { api } from '@/utils/api';
import type { Program } from '@/server/api/routers/studyPrograms';

interface InfoDisplayProps {
    member: Member;
    onUpdateInfo: (member: Member) => Promise<void>;
}

const EditInfoDisplay: React.FC<InfoDisplayProps> = ({ member, onUpdateInfo }) => {
    const [editedMember, setEditedMember] = useState<Member>(member);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [selectedStudyProgram, setSelectedStudyProgram] = useState<string | null>(member.fieldOfStudy);

    // Use useQuery directly within the functional component
    const query = api.programs.getPrograms.useQuery();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if data is already available
                if (!query.isLoading && query.data) {
                    // Access the data and handle loading/error states as needed
                    const { data: response } = query;

                    // Sort the programs array based on title
                    const sortedPrograms = response.sort((a: Program, b: Program) => a.title.localeCompare(b.title));
                    setPrograms(sortedPrograms);
                } else {
                    // Fetch data using the query
                    await query.refetch();
                }
            } catch (error) {
                // Handle error
                console.error('Error fetching data:', error);
            }
        };

        void fetchData();
    }, [query.isLoading, query.data, query]);

    const getInputElement = (label: string) => {
        const handleChange = (newValue: string | boolean | Date | number | undefined) => {
            let parsedValue: string | boolean | Date | number | undefined = newValue;

            if (label === 'yearOfStudy') {
                // Parse newValue as an integer for yearOfStudy
                parsedValue = newValue !== undefined ? parseInt(newValue.toString()) : undefined;
            } else if (label === 'birthday' && typeof newValue === 'string') {
                // Parse newValue as a Date object for birthday
                parsedValue = new Date(newValue);
            } else if (label === 'fieldOfStudy') {
                setSelectedStudyProgram(String(parsedValue));
            }

            setEditedMember(prevState => ({
                ...prevState,
                [label]: parsedValue
            }));
        };

        switch (label) {
            case 'name':
            case 'ntnuMail':
            case 'personalMail':
            case 'linkedin':
            case 'nationalities':
                return (
                    <input
                        className='md:ml-2 rounded-md text-black px-2'
                        type='text'
                        defaultValue={member[label] ?? undefined}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                );
            case 'fieldOfStudy':
                return (
                    <select
                        className='md:ml-2 rounded-md text-black px-2 max-w-sm overflow-x-auto'
                        value={selectedStudyProgram ?? ''}
                        onChange={(e) => handleChange(e.target.value)}
                    >
                        {programs.sort((a, b) => a.studyprogcode.localeCompare(b.studyprogcode)).map((program, index) => (
                            <option className="text-xs" key={index} value={program.studyprogcode}>
                                {program.studyprogcode}
                            </option>
                        ))}
                        <option className="text-xs" key={"other"} value={"Other"}>
                            {"Other"}
                        </option>
                    </select>
                );
            case 'birthday':
                return (
                    <input
                        className='md:ml-2 text-black rounded-md px-2'
                        type='date'
                        defaultValue={
                            editedMember.birthday instanceof Date &&  // Check if input is an instance of Date
                            editedMember.birthday !== null &&  // Check if input is not null
                            editedMember.birthday !== undefined &&
                            editedMember !== undefined ?  // Check if input is not undefined
                            !isNaN(editedMember.birthday?.getTime()) &&  // Check if input is a valid Date object
                            !isNaN(new Date(editedMember.birthday).getDate()) // Check if the date part is valid
                            ? new Date(editedMember.birthday).toISOString().split('T')[0]
                            : ''
                            : ''
                        }

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
                        numberInputProps={{
                            className: 'rounded-md'
                        }}
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
            case 'showPhoneNrOnWebsite':
            case 'birthdayBot':
                return (
                    <input
                        className='md:ml-2 rounded-md text-black px-2 max-w-sm overflow-x-auto w-[25px]'
                        type='checkbox'
                        checked={editedMember[label] ?? false}
                        onChange={(e) => handleChange(e.target.checked)}
                        style={{ borderRadius: '0.375rem' }} // Apply rounded style directly to the input
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
            <h1>Editing: {member.name}</h1>
            <h2>Member information:</h2>
            <ul className='list-disc mb-4 text-xl'>
                {Object.entries(editedMember).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)).map(([key, value]) => {
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
    if (key === 'memberID' || key === 'teamHistory' || key === 'additionalComments' || key === 'slackID' || key === 'orbitMail' || key === 'activeStatus') {
        return 'excluded'; // Or any other value indicating exclusion
    }
    if (value instanceof Date) {
        return value.toLocaleDateString(); // or any other format you prefer
    } else {
        return value ? value.toString() : 'unknown';
    }
};

export default EditInfoDisplay;
