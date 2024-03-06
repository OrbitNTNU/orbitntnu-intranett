import { type AppAndTeams } from "@/pages/applications";
import { api } from "@/utils/api";
import React from "react";

const ApplicantCard = ({applicant, teams}: AppAndTeams) => {

    const teamIdData = api.applications.clientTeamID.useQuery();
    const clientTeamID = teamIdData.data;

    return (
        <div className={`
            ${clientTeamID == teams[0]?.teamID ?
                "bg-secondaryColorTwo hover:bg-[#211932]" :
                "bg-[#494149] hover:bg-[#443b44]"
            }
            rounded-lg my-4 p-4
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