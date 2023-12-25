import NextAuth from "next-auth";
import { sendRequest } from "@/src/utils/api";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "tên đăng nhập", type: "text" },
        password: { label: "mật khẩu", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log("credentials là gì", credentials);
        const res = await sendRequest<IBackendRes<JWT>>({
          url: "http://localhost:8080/api/auth/signin",
          method: "POST",
          body: {
            email: credentials?.username,
            pass_word: credentials?.password,
          },
        });
        console.log(res);
        // Add logic here to look up the user from the credentials supplied
        if (res && res?.data) {
          // Any object returned will be saved in `user` property of the JWT
          return res?.data as any;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          // return null;
          // console.log("res server", res.message);
          throw new Error(res.error as string);
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      // console.log("check token server", token);
      // console.log("check  user", user);
      // console.log("check  account", account);
      // console.log("trigger", trigger);
      if (trigger === "signIn" && account?.provider !== "credentials") {
        const res = await sendRequest<IBackendRes<JWT>>({
          url: "http://localhost:8080/api/auth/social-media",
          method: "POST",
          body: {
            type_: account?.provider?.toLocaleUpperCase(),
            email: user.email,
          },
        });
        // console.log("check token social", res.data);
        if (res && res.data) {
          token.access_token = res.data?.access_token;
          token.refresh_token = res.data?.refresh_token;
          token.content = res.data?.content;
        }
      }
      if (token && user && account?.provider === "credentials") {
        // console.log("token creden", token);
        // console.log("check user", user);

        // @ts-ignore
        token.access_token = user.access_token;
        // @ts-ignore
        token.refresh_token = user.refresh_token;
        // @ts-ignore
        token.content = user.content;
      }
      // console.log("check credential", token);
      return token;
    },
    session({ session, token, user }) {
      // console.log("check session token", token);
      if (token) {
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.user = token.content;
      }
      // console.log("session check time", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
