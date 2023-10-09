import React from "react";
import { SearchResultCard } from "@/components/SearchResultCard";
import { Member } from "@/interfaces/Member";
import { TeamHistory } from "@/interfaces/TeamHistory";
import { Team } from "@/interfaces/Team";

interface SearchResultsProps {
    members: Member[];
    teamHistories: TeamHistory[];
    teams: Team[]
}

export const SearchResultCards = ({members, teamHistories, teams}: SearchResultsProps) => {
    return (
        <div>
            {members ? members.map((member) => (
                <div>
                    <SearchResultCard mid={member.mid} firstName={member.firstName} lastName={member.lastName} backupMail={member.backupMail}/>
                    <hr/>
                </div>
            ))
            :
            null}
        </div>
    )
}