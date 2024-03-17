import React from "react";
import type { Announcement } from "@prisma/client";
import Link from "next/link";
import type { Member } from "@prisma/client";
import Icons from "@/components/General/Icons";
import { formatDateTime } from "@/components/CalendarPage/EventDisplay";

export interface AnnAndMember {
    announcement: Announcement,
    member: Member,
}

interface Props {
    announcements: AnnAndMember[],
}

const ShortAnnouncements = ({announcements}: Props) => {
    const colors = ["bg-[#6c7156]", "bg-[#898176]", "bg-[#997950]"];

    return (
        <section>
            <Link href="/announcements" className="flex flex-row">
                <h2 className="flex items-center mb-4 font-bold text-5xl gap-4">
                    Latest announcements
                    <Icons name="Arrow45Up"/>
                </h2>
            </Link>
            {announcements.map(ann => (
                <div
                    key={ann.announcement.announcementID}
                    className={`max-h-[400px] flex flex-col ${colors[announcements ? announcements?.indexOf(ann) : 0]} rounded-lg m-6 p-8 gap-6`
                }>
                    <p className="text-gray-800">{formatDateTime(ann.announcement.postTime)}</p>
                    <p className="text-xl overflow-auto">{ann.announcement.announcement}</p>
                    <p className="text-gray-800">{ann.member.name}</p>
                    <Link href={"/blog/" + ann.announcement.announcementID}>
                        <div className="flex flex-row gap-2 hover:gap-3 duration-100 ease-in -mt-4">
                            Show post
                            <Icons name="ArrowCircleRight"/>
                        </div>
                    </Link>
                </div>
            ))}
        </section>
    )
}

export default ShortAnnouncements;