"use client";

import {
  AppstoreOutlined,
  TeamOutlined,
  HomeOutlined,
  ApartmentOutlined,
  ContainerOutlined,
  ReadOutlined,
  NotificationOutlined,
  CalendarOutlined,
  FileImageOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TagOutlined,
  GiftOutlined,
  UserOutlined,
  SolutionOutlined,
  KeyOutlined,
  AuditOutlined,
  GitlabOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import { Layout, Menu, type MenuProps } from "antd";
import { AdminContext } from "@/lib/admin.context"; // Đảm bảo đường dẫn đúng
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

// Hàm tạo menu item một cách dễ dàng
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const AdminSider = () => {
  const { Sider } = Layout;
  const { collapseMenu } = useContext(AdminContext)!;

  const items: MenuItem[] = [
    getItem(
      <Link href={"/dashboard"}>Dashboard</Link>,
      "dashboard",
      <AppstoreOutlined />
    ),
    getItem("Quản lý Vườn thú", "zooSub", <HomeOutlined />, [
      getItem(
        <Link href={"/dashboard/animal"}>Động vật</Link>,
        "animals",
        <GitlabOutlined />
      ),
      getItem(
        <Link href={"/dashboard/specie"}>Loài</Link>,
        "species",
        <ApartmentOutlined />
      ),
      getItem(
        <Link href={"/dashboard/enclosure"}>Chuồng trại</Link>,
        "enclosures",
        <ContainerOutlined />
      ),
    ]),
    getItem("Quản lý Nội dung", "contentSub", <ReadOutlined />, [
      getItem(
        <Link href={"/dashboard/new"}>Tin tức</Link>,
        "news",
        <NotificationOutlined />
      ),
      getItem(
        <Link href={"/dashboard/event"}>Sự kiện</Link>,
        "events",
        <CalendarOutlined />
      ),
      getItem(
        <Link href={"/dashboard/image"}>Thư viện Ảnh</Link>,
        "images",
        <FileImageOutlined />
      ),
    ]),
    getItem("Quản lý Bán hàng", "salesSub", <ShoppingCartOutlined />, [
      getItem(
        <Link href={"/dashboard/order"}>Đơn hàng</Link>,
        "orders",
        <ShoppingOutlined />
      ),
      getItem(
        <Link href={"/dashboard/ticket-sale"}>Bán vé</Link>,
        "ticket-sales",
        <AuditOutlined />
      ),
      getItem(
        <Link href={"/dashboard/ticket"}>Loại vé</Link>,
        "tickets",
        <TagOutlined />
      ),
      getItem("Sản phẩm", "productsGroup", <GiftOutlined />, [
        // Sub-menu cho sản phẩm
        getItem(
          <Link href={"/dashboard/product"}>Danh sách Sản phẩm</Link>,
          "products"
        ),
        getItem(
          <Link href={"/dashboard/product-item"}>Mặt hàng</Link>,
          "product-items"
        ),
        getItem(
          <Link href={"/dashboard/product-item-option"}>
            Tùy chọn Mặt hàng
          </Link>,
          "product-item-options"
        ),
      ]),
    ]),
    getItem("Quản lý Người dùng", "userSub", <TeamOutlined />, [
      getItem(
        <Link href={"/dashboard/user"}>Người dùng</Link>,
        "users",
        <UserOutlined />
      ),
      getItem(
        <Link href={"/dashboard/employee"}>Nhân viên</Link>,
        "employees",
        <SolutionOutlined />
      ),
      getItem(
        <Link href={"/dashboard/role"}>Vai trò & Quyền</Link>,
        "roles",
        <KeyOutlined />
      ),
    ]),
  ];

  return (
    <Sider collapsible collapsed={collapseMenu} theme="light">
      <div
        style={{
          height: "32px",
          margin: "16px",
          background: "rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          lineHeight: "32px",
          color: "#fff",
        }}
      >
        {collapseMenu ? "ZF" : "Zoofari Admin"} {/* Logo tạm thời */}
      </div>
      <Menu
        mode="inline"
        items={items}
        style={{ height: "calc(100vh - 64px)", borderRight: 0 }}
        theme="light"
      />
    </Sider>
  );
};

export default AdminSider;
