"use client";

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table, TablePaginationConfig } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AnimalCreate from "./animal.create";
import AnimalUpdate from "./animal.update";
// import { handleDeleteAnimalAction } from "@/services/animal"; // Giả định service
import dayjs from "dayjs";

interface IProps {
  animals: IAnimals[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

const AnimalTable = (props: IProps) => {
  const { animals, meta } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IAnimals | null>(null);

  const columns = [
    {
      title: "STT",
      render: (_: any, _record: IAnimals, index: number) => {
        return <>{index + 1 + (meta.currentPage - 1) * meta.itemsPerPage}</>;
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      hidden: true,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Categories",
      dataIndex: "categories",
    },
    {
      title: "Habitats",
      dataIndex: "habitats",
    },
    {
      title: "Conservation Status",
      dataIndex: "conservations",
    },
    {
      title: "Actions",
      render: (_: any, record: IAnimals) => {
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
              title={"Xác nhận xóa animal"}
              description={"Bạn có chắc chắn muốn xóa animal này ?"}
              // onConfirm={async () => await handleDeleteAnimalAction(record.id)}
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
        <span>Manage Animals</span>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Animal
        </Button>
      </div>
      <Table
        bordered
        dataSource={animals}
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

      <AnimalCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <AnimalUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default AnimalTable;
