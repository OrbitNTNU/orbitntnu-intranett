import React, { useEffect, useState } from "react";
import Layout from "@/templates/Layout"
import ApplicantPopUp, { AppType } from "@/views/ApplicantPopUp";
import { api } from "@/utils/api";
import { type Application, type ApplyForTeam } from "@prisma/client";
import BreakLine from "@/components/General/Breakline";
import ApplicationColumn from "@/views/ApplicationViews/ApplicationColumn";

export interface AppAndTeams {
    applicant: Application,
    teams: ApplyForTeam[],
}

export interface PopupFunc {
    app: AppAndTeams,
    appType: AppType,
}

const Applications = () => {

    const allUnhandledApps = api.applications.getUnhandledApps.useQuery();
    const allUnhandled = allUnhandledApps.data;

    const interviewAppsData = api.applications.getInterviewApps.useQuery();
    const interviewApps = interviewAppsData.data;

    const acceptedAppsData = api.applications.getAccepted.useQuery();
    const acceptedApps = acceptedAppsData.data;

    const dismissedAppsData = api.applications.getDismissed.useQuery();
    const dismissedApps = dismissedAppsData.data;

    // States for the popup
    const [popupDisplay, setPopupDisplay] = useState<boolean>(false);
    const [popupApplicant, setPopupApplicant] = useState<Application | null>(null);
    const [popupAppTeams, setPopupAppTeams] = useState<ApplyForTeam[] | null>(null);
    const [popupAppAndTeams, setAppAndTeams] = useState<AppAndTeams | null>(null);
    const [popupAppType, setPopupAppType] = useState<AppType | null>(null);
    const [openPopup, setOpenPopup] = useState<boolean>(false);

    // Setting the info for the popup
    function applicantPopUp ({app, appType}: PopupFunc) {
        setPopupApplicant(app.applicant);
        setPopupAppTeams(app.teams);
        setPopupAppType(appType);
        setOpenPopup(true);
    };
    
    // Async setting info for popup
    useEffect(() => {
        if (popupApplicant !== null && popupAppTeams !== null) {
            setAppAndTeams({ applicant: popupApplicant, teams: popupAppTeams });
        }
    }, [popupApplicant, popupAppTeams]);
    
    // Async opening popup
    useEffect(() => {
        if (openPopup)
            setPopupDisplay(true);
    }, [openPopup]);

    // Initialise popupDisplay=false on refresh
    useEffect(() => {
        setPopupDisplay(false);
    }, []);

    function closeApplicantPopUp () {
        setPopupDisplay(false);
        setOpenPopup(false);
    }


    return (
        <Layout>

            {popupDisplay &&
                <div>
                    <ApplicantPopUp
                        app={popupAppAndTeams}
                        appType={popupAppType}
                        closePopUpFunction={closeApplicantPopUp}
                    />
                </div>
            }

            <h1>Applications</h1>
            <BreakLine/>

            <div className="flex flex-row justify-between gap-4 my-16">

                {allUnhandled &&
                <ApplicationColumn
                    title="Unhandled"
                    applications={allUnhandled}
                    setPopup={applicantPopUp}
                    appType={AppType.UNHANDLED}
                />
                }


                {interviewApps &&
                <ApplicationColumn
                    title="For interview"
                    applications={interviewApps}
                    setPopup={applicantPopUp}
                    appType={AppType.INTERVIEW}
                />
                }

                {acceptedApps &&
                <ApplicationColumn
                    title="Accepted"
                    applications={acceptedApps}
                    setPopup={applicantPopUp}
                    appType={AppType.ACCEPTED}
                />
                }

                {dismissedApps &&
                <ApplicationColumn
                    title="Dismissed"
                    applications={dismissedApps}
                    setPopup={applicantPopUp}
                    appType={AppType.DISMISSED}
                />
                }

            </div>
        </Layout>
    )
}

export default Applications;