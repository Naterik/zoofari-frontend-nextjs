"use client";

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table, TablePaginationConfig } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import dayjs from "dayjs";
import ProductCreate from "./product.create";
import ProductUpdate from "./product.update";

interface IProps {
  products: IProductModel[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

const ProductTable = (props: IProps) => {
  const { products, meta } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IProductModel | null>(null);

  const columns = [
    {
      title: "STT",
      render: (_: any, _record: IProductModel, index: number) => {
        return <>{index + 1 + (meta.currentPage - 1) * meta.itemsPerPage}</>;
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      hidden: true,
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Động vật",
      dataIndex: "animal",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },

    {
      title: "Actions",
      render: (_: any, record: IProductModel) => {
        return (
          <>
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
              title={"Xác nhận xóa Product"}
              description={"Bạn có chắc chắn muốn xóa Product này ?"}
              // onConfirm={async () => await handleDeleteProductAction(record.id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const onChange = (pagination: TablePaginationConfig) => {
    const params = new URLSearchParams(searchParams);
    if (pagination.current) {
      params.set("page", pagination.current.toString());
    }
    if (pagination.pageSize) {
      params.set("limit", pagination.pageSize.toString());
    }
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
        <span>Manager Products</span>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Product
        </Button>
      </div>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"id"}
        pagination={{
          current: meta.currentPage,
          pageSize: meta.itemsPerPage,
          showSizeChanger: true,
          total: meta.totalItems,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />

      <ProductCreate
      // isCreateModalOpen={isCreateModalOpen}
      // setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <ProductUpdate
      // isUpdateModalOpen={isUpdateModalOpen}
      // setIsUpdateModalOpen={setIsUpdateModalOpen}
      // dataUpdate={dataUpdate}
      // setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default ProductTable;
