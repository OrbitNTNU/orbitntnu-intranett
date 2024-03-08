import { type AppAndTeams } from "@/pages/applications";
import { api } from "@/utils/api";
import React from "react";

const ApplicantCard = ({applicant, teams}: AppAndTeams) => {

    const teamIdData = api.applications.clientTeamID.useQuery();
    const clientTeamID = teamIdData.data;

    return (
        <div className={`
            ${clientTeamID == teams[0]?.teamID ?
                "bg-[#98A5AB] text-black" :
                "bg-[#68757B] text-gray-800"
            }
            rounded-lg p-4
            border border-transparent hover:border-black
        `}>
            <p className="text-lg font-bold">
                {applicant.name}
            </p>
            <p>
                {applicant.fieldOfStudy}, {applicant.yearOfStudy}. year
            </p>
        </div>
    );
}

export default ApplicantCard;