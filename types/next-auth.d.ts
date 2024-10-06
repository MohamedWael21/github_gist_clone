import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: number;
    } & DefaultSession["user"];
  }

  interface Profile {
    id: number;
    login: string;
    avatar_url: string;
    name: string;
    company: string;
    location: string;
    email: string;
    bio: string;
    twitter_username: string;
    followers: number;
    following: number;
  }
}
