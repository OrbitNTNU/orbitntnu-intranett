import React from "react";
import { Application } from "@/interfaces/Application";
import ApplicantCard from "@/components/ApplicantCard";

interface ApplicantsCards {
    onClickFunction: any,
    applicants: Application[]
}

export const ApplicantCards = ({onClickFunction, applicants}: ApplicantsCards) => {
    return (
        <div className="w-full">
            {applicants ? applicants.map((applicant) => (
                <div onClick={() => onClickFunction(applicant)} className="cursor-pointer">
                    <ApplicantCard
                        applicationID={applicant.applicationID}
                        firstName={applicant.firstName}
                        lastName={applicant.lastName}
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
                        teams={applicant.teams}
                        inInterestOf={applicant.inInterestOf}                        
                    />
                </div>
            ))
            :
            false
            }
        </div>
    )
}