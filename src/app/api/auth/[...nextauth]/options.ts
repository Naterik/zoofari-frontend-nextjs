import { IUser } from "@/types/next-auth";
import { sendRequest } from "@/utils/api";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: "http://localhost:8080/auth/login",
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        });
        console.log("Response from API:", res);
        console.log("Credentials:", credentials);
        if (res.statusCode === 201) {
          return {
            id: String(res.data?.user?.id),
            name: res.data?.user?.name,
            email: res.data?.user?.email,
            access_token: res.data?.access_token,
          };
        } else {
          throw new Error(res.message || "Login failed");
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
      if (token) {
        (session.user as IUser) = token.user;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
