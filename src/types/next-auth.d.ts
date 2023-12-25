import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
  id: number;
  full_name: string;
  email: string;
  isVerify: boolean;
  type_: string;
  role: string;
  avatar: string;
  pass_word: string;
  phone: string;
  birth_day: Date;
  gender: boolean;
  address: string;
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    access_token: string;
    refresh_token: string;
    content: IUser;
  }
}
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token: string;
    refresh_token: string;
    user: IUser;
  }
}
