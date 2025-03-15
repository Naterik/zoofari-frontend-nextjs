import type { Metadata } from "next";
import "@ant-design/v5-patch-for-react-19";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import AppHeader from "@/component/layout.client/client.header";
import AppFooter from "@/component/layout.client/client.footer";
import { CustomThemeProvider } from "@/lib/custom.theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <CustomThemeProvider>
            <AppHeader />
            <NextAuthWrapper>{children}</NextAuthWrapper>
            <AppFooter />
          </CustomThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
