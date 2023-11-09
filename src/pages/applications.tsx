import React, { useState } from "react";
import Layout from "@/templates/Layout"
import MockApplicants from "@/mockdata/MockApplicants";
import { ApplicantCards } from "@/views/ApplicantCardsView/index";
import { Application } from "@/interfaces/Application";
import ApplicantPopUp from "@/views/ApplicantPopUp";
import { Interview } from "@/interfaces/Interview";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

const appications = () => {

    // const [fakeConflicts, setConflicts] = useState();

    // const updateAll = () => {
    //     const fakeConflictData = api.applications.fakeGetConflicts.useQuery();
    //     const fakeConflicts = fakeConflictData.data || [];
    //     setConflicts(fakeConflicts ? fakeConflicts : []);
    // }

    const session = useSession();
    const googleToken = session.data?.user.id;
    // console.log("\nGoogle token: " + googleToken)

    const conflictsData = googleToken ? api.applications.getConflictApplicants.useQuery(googleToken) : undefined;
    const conflicts = conflictsData ? conflictsData.data || [] : [];

    const interviewData = googleToken ? api.applications.getInterviewApplications.useQuery(googleToken) : undefined;
    // console.log("Interview data: " + interviewData)
    const interviews = interviewData ? interviewData.data || [] : [];

    // Without googleToken
    const fakeUnhandledData = api.applications.fakeGetUnhandled.useQuery();
    const fakeUnhandled = fakeUnhandledData.data || [];

    const fakeInterestedInData = api.applications.fakeGetInterested.useQuery();
    const fakeInterestedIn = fakeInterestedInData.data || [];

    const fakeConflictData = api.applications.fakeGetConflicts.useQuery();
    const fakeConflicts = fakeConflictData.data || [];

    const fakeInterviewData = api.applications.fakeGetInterviews.useQuery();
    const fakeInterviews = fakeInterviewData.data || [];

    const fakeAcceptedData = api.applications.getAccepted.useQuery();
    const fakeAccepted = fakeAcceptedData.data || [];

    const allApplicationData = api.applications.getAllApplications.useQuery();
    const allApplications = allApplicationData.data || [];


    const [popupDisplay, setPopupDisplay] = useState({display: 'none'});
    const [popupApplicant, setPupupApplicant] = useState<Application | null>(null);

    function applicantPopUp (applicant: Application) {
        setPopupDisplay({display: 'block'});
        setPupupApplicant(applicant);
    }

    function closeApplicantPopUp () {
        setPopupDisplay({display: 'none'});
    }

    return (
        <Layout>
            <div style={popupDisplay}>
                <ApplicantPopUp applicant={popupApplicant} closePopUpFunction={closeApplicantPopUp}/>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-8">
                <div className="flex flex-col items-center w-[300px]">
                    <h2 className="font-medium">
                        Unhandled
                    </h2>
                    <ApplicantCards onClickFunction={applicantPopUp} applicants={fakeUnhandled}/>
                </div>
                <div className="border-r-2 border-secondaryColorTwo"/>
                <div className="flex flex-col items-center w-[300px]">
                    <h2 className="font-medium">
                        Conflict
                    </h2>
                    <ApplicantCards onClickFunction={applicantPopUp} applicants={fakeConflicts}/>
                </div>
                <div className="border-r-2 border-secondaryColorTwo"/>
                <div className="flex flex-col items-center w-[300px]">
                    <h2 className="font-medium">
                        For interview
                    </h2>
                    <ApplicantCards onClickFunction={applicantPopUp} applicants={fakeInterviews}/>
                </div>
            </div>
            <div className="flex flex-col justify-center pt-20">
                <div className="flex flex-col items-center w-[300px]">
                    <h2 className="font-medium">
                        Accepted
                    </h2>
                    <ApplicantCards onClickFunction={applicantPopUp} applicants={fakeAccepted}/>
                </div>
                <div className="flex flex-col items-center w-[300px]">
                    <h2 className="font-medium">
                        Dropped
                    </h2>
                    <ApplicantCards onClickFunction={applicantPopUp} applicants={[]}/>
                </div>
            </div>
        </Layout>
    )
}

export default appications;