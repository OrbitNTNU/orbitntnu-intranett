import React from "react";
import { Member } from "@/interfaces/Member";

export const SearchResultCard = ({mid, firstName, lastName, backupMail}: Member) => {
    return (
        <a className="cursor-pointer flex rounded-lg m-4 p-6 w-[400px] justify-center align-center">
            <div>
                <h2>
                    {firstName} {lastName}
                </h2>
                {/* <p>
                    {team}, {role}
                </p> */}
                <p>
                    {backupMail}
                </p>
            </div>
        </a>
    )
}