"use client";

import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table, TablePaginationConfig } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import OrderDetail from "./orders.detail";

import dayjs from "dayjs";
import { handleDeleteOrderAction } from "@/services/order";

interface IProps {
  orders: IOrder[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    itemCount: number;
  };
}

const OrderTable = (props: IProps) => {
  const { orders, meta } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IOrder | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);

  const columns = [
    {
      title: "STT",
      render: (_: any, _record: IOrder, index: number) =>
        index + 1 + (meta.currentPage - 1) * meta.itemsPerPage,
    },
    { title: "ID", dataIndex: "id", hidden: true },
    {
      title: "Order Date",
      dataIndex: "order_date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    { title: "Total Amount", dataIndex: "total_amount" },
    { title: "Status", dataIndex: "status" },
    {
      title: "User",
      dataIndex: "user",
      render: (user: IUserModel) => user.name,
    },
    {
      title: "Actions",
      render: (_: any, record: IOrder) => (
        <>
          <EyeTwoTone
            twoToneColor="#1890ff"
            style={{ cursor: "pointer", margin: "0 20px" }}
            onClick={() => {
              setDetailId(record.id);
              setIsDetailModalOpen(true);
            }}
          />
          <EditTwoTone
            twoToneColor="#f57800"
            style={{ cursor: "pointer", margin: "0 20px" }}
            onClick={() => {
              setIsUpdateModalOpen(true);
              setDataUpdate(record);
            }}
          />
          <Popconfirm
            placement="leftTop"
            title="Xác nhận xóa order"
            description="Bạn có chắc chắn muốn xóa order này?"
            onConfirm={async () => await handleDeleteOrderAction(record.id)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <DeleteTwoTone
              twoToneColor="#ff4d4f"
              style={{ cursor: "pointer" }}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  const onChange = (pagination: TablePaginationConfig) => {
    const params = new URLSearchParams(searchParams);
    if (pagination.current) params.set("page", pagination.current.toString());
    if (pagination.pageSize)
      params.set("limit", pagination.pageSize.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span>Manage Orders</span>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Order</Button>
      </div>
      <Table
        bordered
        dataSource={orders}
        columns={columns}
        rowKey="id"
        pagination={{
          current: meta.currentPage,
          pageSize: meta.itemsPerPage,
          showSizeChanger: true,
          total: meta.totalItems,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} rows`,
        }}
        onChange={onChange}
      />
      <OrderDetail
        isDetailModalOpen={isDetailModalOpen}
        setIsDetailModalOpen={setIsDetailModalOpen}
        orderDetailId={detailId || 0}
      />
    </>
  );
};

export default OrderTable;
