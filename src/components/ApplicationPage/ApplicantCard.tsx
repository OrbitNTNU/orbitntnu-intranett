import React from "react"
import Applicant from "@/interfaces/Applicant";

const ApplicantCard = ({applicationID, fullName, fieldOfStudy, yearOfStudy}: Applicant) => {
    return (
        <div className="bg-secondaryColorTwo rounded-lg my-4 p-4 hover:bg-[#211932]">
            <p className="text-lg font-bold">
                {fullName}
            </p>
            <p>
                {fieldOfStudy}, {yearOfStudy}. year
            </p>
        </div>
    );
}

export default ApplicantCard;