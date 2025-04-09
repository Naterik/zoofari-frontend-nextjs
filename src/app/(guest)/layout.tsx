"use client";
import AppFooter from "@/component/layout.client/client.footer";
import AppHeader from "@/component/layout.client/client.header";
import { GuestContextProvider } from "@/lib/guest.context";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import { App } from "antd";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthWrapper>
      <GuestContextProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <AppHeader />
          <div style={{ flex: 1 }}>{children}</div>
          <AppFooter />
        </div>
      </GuestContextProvider>
    </NextAuthWrapper>
  );
}
