import React from "react";
import ApplicantCard from "@/components/ApplicationPage/ApplicantCard";
import type { AppAndTeams, PopupFunc } from "@/pages/applications";
import type { AppType } from "@/views/ApplicantPopUp";

interface ApplicantsCards {
    setPopup: ({app, appType}: PopupFunc) => void,
    applicants: AppAndTeams[],
    appType: AppType,
}

export const ApplicantCards = ({setPopup, applicants, appType}: ApplicantsCards) => {
    return (
        <div className="w-full flex flex-col items-center gap-4 mt-8">
            {applicants ? applicants.map((app) => (
                <div key={app.applicant.applicationID} onClick={() => setPopup({app, appType})} className="w-full cursor-pointer">
                    <ApplicantCard
                        applicant={app.applicant}
                        teams={app.teams}
                    />
                </div>
            ))
            :
            false
            }
        </div>
    )
}