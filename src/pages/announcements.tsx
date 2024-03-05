// announcements.tsx

import { formatDateTime } from "@/components/CalendarPage/EventDisplay";
import BreakLine from "@/components/General/Breakline";
import Button from "@/components/General/Button";
import Icons from "@/components/General/Icons";
import Layout from "@/templates/Layout";
import { api } from "@/utils/api";
import type { Announcement, Member } from "@prisma/client";
import Link from "next/link";

export interface AnnAndMember {
  announcement: Announcement,
  member: Member,
}

const Announcements = () => {
  const announcementsData = api.announcements.getLatestAnnouncements.useQuery();
  const announcements = announcementsData.data as AnnAndMember[];

  return (
    <Layout>
      <div className='md:flex justify-between items-center'>
        <ul>
          <h1>Announcements</h1>
        </ul>
        <div className="md:mt-0 mt-4">
          <Button label={'Write an announcement'} onClick={() => console.log("Announcement make")} icon="Create" />
        </div>
      </div>
      <BreakLine />

      <section className="flex md:flex-row flex-col">
        {announcements?.map(ann => (
          <div
            key={ann.announcement.announcementID}
            className={`max-h-[800px] md:w-1/2 w-full flex flex-col rounded-lg m-6 p-8 gap-6 bg-blue-500`
            }>
            <p className="text-gray-800">{formatDateTime(ann.announcement.postTime)}</p>
            <p className="text-xl overflow-auto">{ann.announcement.announcement}</p>
            <p className="text-gray-800">{ann.member.name}</p>
            <Link href={"/blog/" + ann.announcement.announcementID}>
              <p className="flex flex-row gap-2 hover:gap-3 duration-100 ease-in -mt-4">
                Show post
                <Icons name="ArrowCircleRight" />
              </p>
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  )
};

export default Announcements;

