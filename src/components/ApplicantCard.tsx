import React from "react"
import { Application } from "@/interfaces/Application";



const ApplicantCard = ({applicationID, firstName, lastName, fieldOfStudy, yearOfStudy}: Application) => {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder("utf-8");

    const firstNameEncoded = encoder.encode(firstName)
    const firstNameDecoded = decoder.decode(firstNameEncoded);

    const lastNameEncoded = encoder.encode(lastName)
    const lastNameDecoded = decoder.decode(lastNameEncoded);
    
    return (
        <div key={applicationID} className="bg-secondaryColorTwo rounded-lg my-4 p-4 hover:bg-[#211932]">
            <p className="text-lg font-bold">
                {firstNameDecoded + " " + lastNameDecoded}
            </p>
            <p>
                {fieldOfStudy}, {yearOfStudy}. year
            </p>
        </div>
    );
}

export default ApplicantCard;