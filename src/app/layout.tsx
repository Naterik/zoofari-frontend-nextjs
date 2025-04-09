import type { Metadata } from "next";
import "@ant-design/v5-patch-for-react-19";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { CustomThemeProvider } from "@/lib/custom.theme";
import AppHeader from "@/component/layout.client/client.header";
import AppFooter from "@/component/layout.client/client.footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zoofari - Explore the Wildlife",
  description: "A zoo website for wildlife enthusiasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <CustomThemeProvider>{children}</CustomThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
