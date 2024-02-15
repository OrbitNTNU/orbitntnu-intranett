import React from "react";
import type { Announcement } from "@prisma/client";
import { api } from "@/utils/api";
import Link from "next/link";
import type { Member } from "@prisma/client";

export interface AnnAndMember {
    announcement: Announcement,
    member: Member,
}

interface Props {
    announcements: AnnAndMember[] | undefined,
}


const ShortAnnouncements = ({announcements}: Props) => {

    function formatDateTime(date: Date) {
        const options = {
            weekday: "short", // Full name of the weekday (e.g., “Monday”)
            year: "numeric", // Numeric representation of the year (e.g., “2022”)
            month: "short", // Full name of the month (e.g., “January”)
            day: "numeric", // Numeric representation of the day (e.g., “1”)
            hour: "numeric", // Numeric representation of the hour (e.g., “13")
            minute: "2-digit", // Two-digit representation of the minute (e.g., “05”)
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    const colors = ["bg-[#6c7156]", "bg-[#898176]", "bg-[#997950]"];

    return (
        <section>
            <Link href="/blog" className="flex flex-row">
                <h2 className="flex items-center mb-4 font-bold text-5xl">
                    Latest announcements
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="ml-6 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </h2>
            </Link>
            {announcements?.map(ann => (
                <div
                    key={ann.announcement.announcementID}
                    className={`max-h-[400px] flex flex-col ${colors[announcements ? announcements?.indexOf(ann) : 0]} rounded-lg m-6 p-8 gap-6`
                }>
                    <p className="text-gray-800">{formatDateTime(ann.announcement.postTime)}</p>
                    <p className="text-xl overflow-auto">{ann.announcement.announcement}</p>
                    <p className="text-gray-800">{ann.member.firstName + " " + ann.member.lastName}</p>
                    <Link href={"/blog/" + ann.announcement.announcementID}>
                        <p className="flex flex-row gap-2 hover:gap-3 duration-100 ease-in -mt-4">
                            Show post
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </p>

                    </Link>
                </div>
            ))}
        </section>
    )
}

export default ShortAnnouncements;