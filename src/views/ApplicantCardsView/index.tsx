import React from "react";
import Applicant from "@/interfaces/Applicant";
import ApplicantCard from "@/components/ApplicationPage/ApplicantCard";

interface ApplicantsCards {
    onClickFunction: any,
    applicants: Applicant[]
}

export const ApplicantCards = ({onClickFunction, applicants}: ApplicantsCards) => {
    return (
        <div className="w-full">
            {applicants ? applicants.map((applicant) => (
                <div onClick={() => onClickFunction(applicant)} className="cursor-pointer">
                    <ApplicantCard
                        applicationID={applicant.applicationID}
                        fullName={applicant.fullName}
                        fieldOfStudy={applicant.fieldOfStudy}
                        yearOfStudy={applicant.yearOfStudy}
                        ntnuUsername={applicant.ntnuUsername}
                        email={applicant.email}
                        phoneNumber={applicant.phoneNumber}
                        experience={applicant.experience}
                        aboutYou={applicant.aboutYou}
                        accepted={applicant.accepted}
                        keep={applicant.keep}
                        rejectTime={applicant.rejectTime}
                    />
                </div>
            ))
            :
            false
            }
        </div>
    )
}