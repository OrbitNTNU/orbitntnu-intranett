import { useSession } from "next-auth/react";
import Icons from "../General/Icons";
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Event_type, type Event } from "@prisma/client";
import { formatDateTime } from "./EventDisplay";
import { generateColors, generateIndexes, setContrast } from "./Colors";
import Button from "../General/Button";
import { api } from "@/utils/api";

interface CreateEventDisplayProps {
    toggleEdit: Dispatch<SetStateAction<boolean>>;
}

const CreateEventDisplay = ({ toggleEdit }: CreateEventDisplayProps) => {
    const session = useSession();
    const member = session.data?.user.memberInfo;

    const [createdEvent, setCreatedEvent] = useState<Event>({
        eventID: 0,
        name: "",
        startTime: new Date(),
        description: "",
        location: "",
        memberID: member?.memberID ?? 0,
        timeOfCreation: new Date(),
        type: "OTHER",
        endTime: new Date(),
    });

    const addEventQuery = api.events.createEvent.useMutation();

    async function handleAddEvent(event: Event, toggleEdit: (boolean: boolean) => void) {
        if(event.name !== "" && event.description !== "" && event.location !== "" && event.startTime < event.endTime) {
            try {
                // Perform the mutation and wait for it to complete
                await addEventQuery.mutateAsync(event);
                toggleEdit(false);
            } catch (error) {
                // Handle any errors that occur during the mutation
                console.error("Error adding event:", error);
            }
        } else {
            window.alert("Wrong input, you must have a description, name, location, and end time must be after start time")
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCreatedEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateTimeChange = (name: string, value: string) => {
        if (!isNaN(Date.parse(value))) {
            setCreatedEvent(prevState => ({
                ...prevState,
                [name]: new Date(value)
            }));
        }
    };

    const generatedIndexes = generateIndexes();
    const eventColors = generateColors();

    const backgroundColor = eventColors[generatedIndexes[createdEvent.type]!];
    // Check if backgroundColor is defined before calling setContrast
    const textColor = backgroundColor ? setContrast(backgroundColor) : '';

    const formattedStartTime = formatDateTime(createdEvent.startTime);
    const formattedEndTime = formatDateTime(createdEvent.endTime);

    const adjustTime = (date: Date) => {
        const adjustedDate = new Date(date);
        const timezoneOffset = adjustedDate.getTimezoneOffset();
        adjustedDate.setMinutes(adjustedDate.getMinutes() + - timezoneOffset);
        return adjustedDate.toISOString().slice(0, -8);
    };

    return (
        <div className="flex flex-col items-center">
            {/* Form */}
            <div className="w-full flex justify-center">
                <form className="flex flex-col gap-4 md:w-2/3 w-full">
                    <input type="text" name="name" placeholder="Event Name" value={createdEvent.name} onChange={handleInputChange} className="p-2 rounded-md text-black w-full" />
                    <input type="text" name="location" placeholder="Location" value={createdEvent.location} onChange={handleInputChange} className="p-2 rounded-md text-black w-full" />
                    <textarea name="description" placeholder="Description" value={createdEvent.description ?? ''} onChange={handleInputChange} className="p-2 rounded-md resize-none text-black w-full"></textarea>
                    <div className="flex flex-col items-center md:flex-row md:flex-wrap justify-center gap-2">
                        <div className="flex-col">
                            <h3>Start Time:</h3>
                            <input
                                name="startTime"
                                className='text-black rounded-md p-2 w-[180px]'
                                type='datetime-local'
                                value={adjustTime(createdEvent.startTime)}
                                onChange={(e) => handleDateTimeChange("startTime", e.target.value)}
                            />
                        </div>
                        <div className="flex-col">
                            <h3>End Time:</h3>
                            <input
                                name="endTime"
                                className='text-black rounded-md p-2 w-[180px]'
                                type='datetime-local'
                                value={adjustTime(createdEvent.endTime)}
                                onChange={(e) => handleDateTimeChange("endTime", e.target.value)}
                            />
                        </div>
                        <div className="flex-col">
                            <h3>Event Type:</h3>
                            <select
                                name="type"
                                className='text-black rounded-md p-2 w-[180px] h-[42px]'
                                value={createdEvent.type}
                                onChange={(e) => handleInputChange(e)}
                            >
                                {Object.keys(Event_type).map((key) => (
                                    <option key={key} value={Event_type[key as keyof typeof Event_type]}>{Event_type[key as keyof typeof Event_type]}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center items-center w-full mt-10 flex-col">
                <h2>Preview</h2>
                <div className="flex flex-col justify-between min-w-[350px] h-[235px] w-[300px] md:w-[500px] p-4 bg-green-500 rounded-lg" style={{ backgroundColor: backgroundColor, color: textColor }}>
                    <div>
                        <h3 className="text-xl font-bold flex flex-row justify-between items-center">
                            {createdEvent.name === "" ? "Event Name" : createdEvent.name}
                            <div className="flex flex-row items-center gap-2">
                                <Icons name="Location" />
                                <span className="ml-auto">
                                    {createdEvent.location === "" ? "Event Location" : createdEvent.location}
                                </span>
                            </div>
                        </h3>
                        <p className="mt-1">
                            {formattedStartTime} - {formattedEndTime}
                        </p>
                        <hr className="border my-1" />
                        <p className="mt-1 overflow-auto h-[100px]">
                            {createdEvent.description === "" ? "Event Description" : createdEvent.description}
                        </p>
                    </div>
                    <div className="mt-auto">
                        <div className="flex flex-row gap-2">
                            <Icons name="User" />
                            {member?.name}, {createdEvent.type}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <Button label={"Add to Calendar"} icon="Plus" onClick={() => void handleAddEvent(createdEvent, toggleEdit)} />
                </div>
            </div>
        </div>
    );
}

export default CreateEventDisplay;
