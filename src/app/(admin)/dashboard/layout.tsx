import AdminContent from "@/app/component/layout/admin.content";
import AdminFooter from "@/app/component/layout/admin.footer";
import AdminHeader from "@/app/component/layout/admin.header";
import AdminSider from "@/app/component/layout/admin.sider";
import { AdminContextProvider } from "@/libary/admin.context";


const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <AdminContextProvider>
            <div style={{ display: "flex" }}>
                <div className='left-side' style={{ minWidth: 80 }}>
                    <AdminSider />
                </div>
                <div className='right-side' style={{ flex: 1 }}>
                    <AdminHeader />
                    <AdminContent>
                        {children}
                    </AdminContent>
                    <AdminFooter />
                </div>
            </div>
        </AdminContextProvider>
    )
}

export default AdminLayout