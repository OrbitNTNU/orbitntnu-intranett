import { membersRouter } from "./routers/members";
import { createTRPCRouter } from "@/server/api/trpc";
import { teamsRouter } from "./routers/teams";
import { teamHistoriesRouter } from "./routers/teamHistories";
import { applicationsRouter } from "./routers/applications";
import { announcementsRouter } from "./routers/announcements";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  members: membersRouter, // Include the membersRouter here
  teams: teamsRouter,
  teamHistories: teamHistoriesRouter,
  applications: applicationsRouter,
  announcements: announcementsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
