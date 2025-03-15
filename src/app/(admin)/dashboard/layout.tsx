import AdminContent from "@/component/layout.admin/admin.content";
import AdminFooter from "@/component/layout.admin/admin.footer";
import AdminHeader from "@/component/layout.admin/admin.header";
import AdminSider from "@/component/layout.admin/admin.sider";
import { auth } from "@/auth";
import { AdminContextProvider } from "@/lib/admin.context";

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
