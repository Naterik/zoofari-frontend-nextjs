import { NextAuthConfig } from "next-auth";
import { sendRequest } from "../utils/api";
import { IUser } from "../types/next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  InactiveAccountError,
  InvalidEmailPasswordError,
} from "../utils/error";
import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

// Cấu hình NextAuth (Auth.js)
const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await sendRequest<IBackendRes<IBackendRes<ILogin>>>({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          body: {
            username: credentials?.username,
            password: credentials?.password,
          },
        });

        console.log("Backend response:", res); // Thêm log để debug

        // Kiểm tra statusCode ở lớp ngoài
        if (res.statusCode === 201 && res.data?.statusCode === 200) {
          const loginData = res.data; // Lấy lớp trong
          return {
            id: loginData.data?.user?.id,
            name: loginData.data?.user?.name,
            email: loginData.data?.user?.email,
            access_token: loginData.data?.access_token,
          };
        } else if (res.statusCode === 401 || res.data?.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (res.statusCode === 400 || res.data?.statusCode === 400) {
          throw new InactiveAccountError();
        } else if (res.statusCode === 404 || res.data?.statusCode === 404) {
          throw new Error(
            "API endpoint not found. Please check the backend URL."
          );
        } else {
          throw new Error(
            `Internal Server Error: ${
              res.message || res.data?.message || "Unknown error"
            }`
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.user = user as IUser;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      (session.user as IUser) = token.user;
      return session;
    },
    async authorized({ auth }: { auth: Session | null }) {
      return !!auth;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

// Khởi tạo và export các hàm của NextAuth
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);

// Export authConfig nếu cần
export { authConfig };
