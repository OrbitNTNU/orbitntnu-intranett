import React from "react";
import Icons from "./Icons";
import type { Member, Team, TeamHistory } from "@prisma/client";
import { getCurrentTeam, getRole } from "../ProfilePage/SearchResults";

interface MemberInfoProps {
    member: Member;
    onClick?: (member: Member) => void;
    teams: Team[];
    teamHistories: TeamHistory[];
    icon1?: string;
    icon1Click?: () => void;
    isTeamLead?: boolean; // New prop indicating if it's a team lead or not
}

const MemberInfo = ({ member, onClick, teams, teamHistories, icon1, icon1Click, isTeamLead }: MemberInfoProps) => {
    let backgroundColorClass;
    let hoverColorClass;

    if (isTeamLead) {
        backgroundColorClass = 'bg-green-600';
        hoverColorClass = onClick ? 'hover:bg-green-800' : '';
    } else if (member.activeStatus && icon1 !== "AddPerson") {
        backgroundColorClass = 'bg-blue-600';
        hoverColorClass = onClick ? 'hover:bg-blue-800' : '';
    } else {
        backgroundColorClass = 'bg-gray-600';
        hoverColorClass = onClick ? 'hover:bg-gray-700' : '';
    }

    return (
        <div
            key={member.memberID}
            className={`rounded-lg w-[270px] flex flex-col overflow-x-auto mb-6 ${backgroundColorClass} ${hoverColorClass} p-3 mx-3 ${onClick ? 'cursor-pointer' : 'cursor-hover'}`}
            onClick={onClick ? () => onClick(member) : undefined}
        >
            {icon1 !== undefined && icon1Click !== undefined ? (
                <div className="flex flex-row justify-between">
                    <h3 className='font-bold'>{member.firstName} {member.lastName}</h3>
                    <button
                        className={`rounded-lg ${icon1 === "Cross" || icon1 === "Arrow45Up" ? "hover:bg-red-500" : "hover:bg-green-500"} p-0.5`}
                        onClick={() => icon1Click()}
                    >
                        <Icons name={icon1} />
                    </button>
                </div>
            ) :
                <h3 className='font-bold'>{member.firstName} {member.lastName}</h3>
            }

            <hr className="border my-2" />
            <p className='text-subtext overflow-auto'>{member.orbitMail}</p>
            <div className="mt-auto pt-4">
                <p className='text-subtext items-bottom'>{getCurrentTeam(teamHistories, member, teams) + ", " + getRole(member, teamHistories)}</p>
                <p className='text-subtext'>{member.activeStatus ? 'Active' : 'Inactive'}</p>
            </div>
        </div>
    )
};

export default MemberInfo;
