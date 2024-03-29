import type { AnnAndMember } from "@/views/LandingPageViews/AnnouncementView";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const announcementsRouter = createTRPCRouter({
  getLatestAnnouncements: protectedProcedure.query(async ({ ctx }) => {
    const announcements = await ctx.db.announcement.findMany();

    const sortedAnnouncements = announcements.sort((a,b) => a.postTime < b.postTime ? 1 : -1)
    let latestAnnouncements = sortedAnnouncements;
    if (sortedAnnouncements.length > 3) {
      latestAnnouncements = sortedAnnouncements.slice(0,3);
    }

    const annAndMember: AnnAndMember[] = [];

    for (const ann of latestAnnouncements) {
      const writer = await ctx.db.member.findUnique({
        where: {
          memberID: ann.memberID,
        }
      })!;
      if (writer !== null) {
        const both: AnnAndMember = {
          announcement: ann,
          member: writer,
        };
        annAndMember.push(both);
      }
    }

    return annAndMember;
  }),

  getAllPosts: protectedProcedure.query(async ({ ctx }) => {
    const allPosts = await ctx.db.announcement.findMany();
    return allPosts;
  })
});
