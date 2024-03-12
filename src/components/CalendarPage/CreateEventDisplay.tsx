import { useSession } from "next-auth/react";
import Icons from "../General/Icons";
import { useState } from "react";
import type { Event } from "@prisma/client";
import { formatDateTime } from "./EventDisplay";

const CreateEventDisplay = () => {
    const [createdEvent, setCreatedEvent] = useState<Event>({
        eventID: 0,
        name: "",
        startTime: new Date(),
        description: null,
        location: "",
        memberID: 0,
        timeOfCreation: new Date(),
        type: "OTHER",
        endTime: new Date(),
    });

    const session = useSession();
    const member = session.data?.user.member;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "startTime" && !isNaN(Date.parse(value))) {
            setCreatedEvent(prevState => ({
                ...prevState,
                [name]: new Date(value)
            }));
        } else {
            setCreatedEvent(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const formattedStartTime = formatDateTime(createdEvent.startTime);
    const formattedEndTime = formatDateTime(createdEvent.endTime);

    return (
        <div className="flex flex-row">
            {/* Form */}
            <div className="w-full md:w-1/2">
                <div className="flex flex-col justify-between h-full">
                    <form className="flex flex-col gap-4 p-4">
                        <input type="text" name="name" placeholder="Event Name" value={createdEvent.name ?? ''} onChange={handleInputChange} className="p-2 rounded-md text-black" />
                        <input type="text" name="location" placeholder="Location" value={createdEvent.location} onChange={handleInputChange} className="p-2 rounded-md text-black" />
                        <textarea name="description" placeholder="Description" value={createdEvent.description ?? ''} onChange={handleInputChange} className="p-2 rounded-md resize-none text-black"></textarea>
                        <input
                            name="startTime"
                            className='text-black rounded-md p-2 w-[130px]'
                            type='date'
                            value={createdEvent.startTime.toISOString().split('T')[0]}
                            onChange={(e) => {
                                if (
                                    !isNaN(createdEvent.startTime.getDate()) &&  // Check if input is a valid Date object
                                    !isNaN(createdEvent.startTime.getUTCFullYear()) &&  // Check if input is a valid Date object
                                    !isNaN(createdEvent.startTime.getDay()) &&  // Check if input is a valid Date object
                                    !isNaN(createdEvent.startTime.getMonth()) // Check if the date part is valid
                                ) {
                                    handleInputChange(e);
                                }
                            }}
                            
                        />

                    </form>
                </div>
            </div>
            {/* Preview */}
            <div className="justify-end">
                <div className="flex flex-col justify-between h-[235px] w-[400px] p-4 bg-green-500 rounded-lg">
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
                            {createdEvent.description}
                        </p>
                    </div>
                    <div className="mt-auto flex items-center">
                        <Icons name="User" />
                        <p className="ml-2">
                            {member.name}, {createdEvent.type}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEventDisplay;
