import AdminContent from "@/app/component/layout/admin.content";
import AdminFooter from "@/app/component/layout/admin.footer";
import AdminHeader from "@/app/component/layout/admin.header";
import AdminSider from "@/app/component/layout/admin.sider";
import { auth } from "@/auth";
import { AdminContextProvider } from "@/libary/admin.context";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  return (
    <AdminContextProvider>
      <div style={{ display: "flex" }}>
        <div className="left-side" style={{ minWidth: 80 }}>
          <AdminSider />
        </div>
        <div className="right-side" style={{ flex: 1 }}>
          <AdminHeader session={session} />
          <AdminContent>{children}</AdminContent>
          <AdminFooter />
        </div>
      </div>
    </AdminContextProvider>
  );
};

export default AdminLayout;
