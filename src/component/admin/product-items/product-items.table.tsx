"use client";

import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table, TablePaginationConfig } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductItemsCreate from "./product-items.create";
import ProductItemsDetail from "./product-items.detail";
import ProductItemsUpdate from "./product-items.update";
import { handleDeleteProductItemAction } from "@/services/product-item";

interface IProps {
  productItems: IProductItem[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    itemCount: number;
  };
  products: IProduct[];
}

const ProductItemsTable = (props: IProps) => {
  const { productItems, meta, products } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IProductItem | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);

  const columns = [
    {
      title: "STT",
      render: (_: any, _record: IProductItem, index: number) =>
        index + 1 + (meta.currentPage - 1) * meta.itemsPerPage,
    },
    { title: "ID", dataIndex: "id", hidden: true },
    {
      title: "Title",
      dataIndex: "title",
      render: (title: string, record: IProductItem) => (
        <a
          onClick={() => {
            setDetailId(record.id);
            setIsDetailModalOpen(true);
          }}
          style={{ color: "#1890ff", cursor: "pointer" }}
        >
          {title}
        </a>
      ),
    },
    { title: "Base Price", dataIndex: "basePrice" },
    { title: "Description", dataIndex: "description" },
    { title: "Code", dataIndex: "code" },
    { title: "Stock", dataIndex: "stock" },
    {
      title: "Actions",
      render: (_: any, record: IProductItem) => (
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
            title="Xác nhận xóa product item"
            description="Bạn có chắc chắn muốn xóa product item này?"
            onConfirm={async () =>
              await handleDeleteProductItemAction(record.id)
            }
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
        <span>Manage Product Items</span>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Product Item
        </Button>
      </div>
      <Table
        bordered
        dataSource={productItems}
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
      <ProductItemsCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        products={products}
      />
      <ProductItemsUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        products={products}
      />
      <ProductItemsDetail
        isDetailModalOpen={isDetailModalOpen}
        setIsDetailModalOpen={setIsDetailModalOpen}
        productItemId={detailId || 0}
      />
    </>
  );
};

export default ProductItemsTable;
