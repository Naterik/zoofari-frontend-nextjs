import AppHeader from "@/component/layout.client/client.header";
import AppFooter from "@/component/layout.client/client.footer";
import { GuestContextProvider } from "@/lib/guest.context";

import NextAuthWrapper from "@/lib/next.auth.wrapper";

const GuestLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <GuestContextProvider>
      <NextAuthWrapper>
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
      </NextAuthWrapper>
    </GuestContextProvider>
  );
};

export default GuestLayout;
