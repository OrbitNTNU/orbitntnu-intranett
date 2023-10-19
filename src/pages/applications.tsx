import React, { useState } from "react";
import Layout from "@/templates/Layout"
import MockApplicants from "@/mockdata/MockApplicants";
import { ApplicantCards } from "@/views/ApplicantCardsView/index";
import Applicant from "@/interfaces/Applicant";
import ApplicantPopUp from "@/views/ApplicantPopUp";

const appications = () => {
    
    const unHandledIDs: number[] = [5, 2];
    const conflictIDs: number[] = [3];
    const forInterviewIDs: number[] = [4];
    const droppedIDs: number[] = [1];
    
    const unHandledApplicants: Applicant[] = MockApplicants.filter((applicant) => unHandledIDs.includes(applicant.applicationID))
    const conflictApplicants: Applicant[] = MockApplicants.filter((applicant) => conflictIDs.includes(applicant.applicationID))
    const forInterviewApplicants: Applicant[] = MockApplicants.filter((applicant) => forInterviewIDs.includes(applicant.applicationID))
    const droppedApplicants: Applicant[] = MockApplicants.filter((applicant) => droppedIDs.includes(applicant.applicationID))

    const [popupDisplay, setPopupDisplay] = useState({display: 'none'});
    const [popupApplicant, setPupupApplicant] = useState<Applicant | null>(null);

    function applicantPopUp (applicant: Applicant) {
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
                    <ApplicantCards onClickFunction={applicantPopUp} applicants={unHandledApplicants}/>
                </div>
                <div className="border-r-2 border-secondaryColorTwo"/>
                <div className="flex flex-col items-center w-[300px]">
                    <h2 className="font-medium">
                        Conflict
                    </h2>
                    <ApplicantCards onClickFunction={applicantPopUp} applicants={conflictApplicants}/>
                </div>
                <div className="border-r-2 border-secondaryColorTwo"/>
                <div className="flex flex-col items-center w-[300px]">
                    <h2 className="font-medium">
                        For interview
                    </h2>
                    <ApplicantCards onClickFunction={applicantPopUp} applicants={forInterviewApplicants}/>
                </div>
            </div>
            <div className="flex justify-center pt-20">
                <div className="flex flex-col items-center w-[300px]">
                    <h2 className="font-medium">
                        Dropped
                    </h2>
                    <ApplicantCards onClickFunction={applicantPopUp} applicants={droppedApplicants}/>
                </div>
            </div>
        </Layout>
    )
}

export default appications;