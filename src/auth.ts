import NextAuth from "next-auth";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";
import Credentials from "next-auth/providers/credentials";
import { InactiveAccountError, InvalidEmailPasswordError } from "./utils/error";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          body: {
            username: credentials.username,
            password: credentials.password,
          },
        });

        if (res.statusCode === 201) {
          //return user
          return {
            id: res.data?.user?.id,
            name: res.data?.user?.name,
            email: res.data?.user?.email,
            access_token: res.data?.access_token,
          };
        } else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.statusCode === 400) {
          throw new InactiveAccountError();
        } else {
          throw new Error("Internal Server Error");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as IUser;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
