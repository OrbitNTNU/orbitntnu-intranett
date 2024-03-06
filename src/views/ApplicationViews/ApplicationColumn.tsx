import React from "react";
import { ApplicantCards } from "./ApplicantCards";
import { type AppAndTeams, type PopupFunc } from "@/pages/applications";
import { type AppType } from "../ApplicantPopUp";

interface ColumnProps {
    title: string,
    applications: AppAndTeams[],
    setPopup: ({app, appType}: PopupFunc) => void,
    appType: AppType,
}

const ApplicationColumn = ({title, applications, setPopup, appType}: ColumnProps) => {
    return (
        <div className="flex flex-col items-center w-[24%]">
            <h2 className="font-medium">
                {title}
            </h2>
            <ApplicantCards
                setPopup={setPopup}
                applicants={applications}
                appType={appType}
            />
        </div>
    )
}

export default ApplicationColumn;