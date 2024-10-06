import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { createUser, getUserByGithubId } from "./actions/user.actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (profile) {
        await createUser({
          username: profile.login,
          image: profile.avatar_url,
          name: profile.name || "",
          email: profile.email || "",
          company: profile.company,
          location: profile.location,
          bio: profile.bio,
          twitterName: profile.twitter_username,
          followers: profile.followers,
          following: profile.following,
          id: profile.id,
        });
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = Number(token.sub);
      return session;
    },
  },
};

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return undefined;
  const user = await getUserByGithubId(session.user.id);
  return user;
}
export async function requireUser(redirectTo?: string) {
  const user = await getCurrentUser();
  if (user) return user;
  redirect(redirectTo || "/starred");
}
