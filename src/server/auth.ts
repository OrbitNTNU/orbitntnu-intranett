import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";

import { env } from "@/env.mjs";
import { db } from "@/server/db";
import type { MemberInfoData } from "@/interfaces/MemberInfo";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      memberInfo: MemberInfoData;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      // Fetch Member data from the database based on user ID
      const memberInfo = await db.member.findUnique({
        where: {
          activeStatus: true,
          orbitMail: user.email,
        },
        include: {
          teamHistory: {
            where: {
              endSem: null,
              endYear: null
            },
            include: {
              team: true
            }
          }
        }
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          memberInfo: memberInfo ? {
            teamHistory: memberInfo.teamHistory,
            memberID: memberInfo.memberID,
            name: memberInfo.name,
            activeStatus: memberInfo.activeStatus,
            orbitMail: memberInfo.orbitMail} 
            : null, // Include Member data in the session
        },
      };
    },
    signIn({ account, profile }) {
      if (account!.provider === "google") {
        return (
          (profile as GoogleProfile).email_verified &&
          profile!.email!.endsWith("orbitntnu.com")
        );
      }
      throw new Error("Something went wrong");
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
