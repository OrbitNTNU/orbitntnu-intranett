import React from "react";
import Icons from "./Icons";
import type { MemberInfoData } from "@/interfaces/MemberInfo";

interface MemberInfoProps {
    onClick?: (member: MemberInfoData) => void;
    icon1?: string;
    icon1Click?: () => void;
    isTeamLead?: boolean; // New prop indicating if it's a team lead or not
    memberInfo: MemberInfoData
}

const MemberInfo = ({ onClick, icon1, icon1Click, isTeamLead, memberInfo }: MemberInfoProps) => {
    let backgroundColorClass;
    let hoverColorClass;

    if (isTeamLead) {
        backgroundColorClass = 'bg-green-600';
        hoverColorClass = onClick ? 'hover:bg-green-800' : '';
    } else if (memberInfo.activeStatus && icon1 !== "AddPerson") {
        backgroundColorClass = 'bg-blue-600';
        hoverColorClass = onClick ? 'hover:bg-blue-800' : '';
    } else {
        backgroundColorClass = 'bg-gray-600';
        hoverColorClass = onClick ? 'hover:bg-gray-700' : '';
    }

    const generateBio = (memberInfo: MemberInfoData) => {
        if (memberInfo.activeStatus) {
            if (memberInfo.teamHistory.length === 1 && memberInfo.teamHistory[0]) {
                const teamHistory = memberInfo.teamHistory[0];
                if (teamHistory?.priviledges === "BOARD") {
                    return teamHistory?.cPosition;
                } else if (teamHistory?.priviledges === "MENTOR") { 
                    return teamHistory?.priviledges.charAt(0).toUpperCase() + teamHistory?.priviledges.slice(1).toLowerCase();
                } else {
                    return teamHistory?.team.teamName + ", " + teamHistory?.priviledges.charAt(0).toUpperCase() + teamHistory?.priviledges.slice(1).toLowerCase();
                }
            } else {
                return "Multiple Active Positions"
            }
        } else {
            return "Inactive";
        }
    };
    

    return (
        <div
            key={memberInfo.memberID}
            className={`rounded-lg w-[270px] flex flex-col overflow-x-auto mb-6 ${backgroundColorClass} ${hoverColorClass} p-3 mx-3 ${onClick ? 'cursor-pointer' : 'cursor-hover'}`}
            onClick={onClick ? () => onClick(memberInfo) : undefined}
        >
            {icon1 !== undefined && icon1Click !== undefined ? (
                <div className="flex flex-row justify-between">
                    <h3 className='font-bold'>{memberInfo.name}</h3>
                    <button
                        className={`rounded-lg ${icon1 === "Cross" || icon1 === "Arrow45Up" ? "hover:bg-red-500" : "hover:bg-green-500"} p-0.5`}
                        onClick={() => icon1Click()}
                    >
                        <Icons name={icon1} />
                    </button>
                </div>
            ) :
                <h3 className='font-bold'>{memberInfo.name}</h3>
            }

            <hr className="border my-2" />
            <p className='text-subtext overflow-auto'>{memberInfo.orbitMail}</p>
            <div className="mt-auto pt-4">
                    <p className='text-subtext items-bottom'>
                        {generateBio(memberInfo)}
                    </p>
            </div>
        </div>
    );
};

export default MemberInfo;
