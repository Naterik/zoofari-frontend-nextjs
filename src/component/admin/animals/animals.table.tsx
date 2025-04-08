"use client";

import { DeleteTwoTone, EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table, TablePaginationConfig } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AnimalCreate from "./animals.create";
import AnimalDetail from "./animals.detail";
import AnimalUpdate from "./animals.update";
import { handleDeleteAnimalAction } from "@/services/animal";

interface IProps {
  animals: IAnimals[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    itemCount: number;
  };
  enclosures: IEnclosure[];
  species: ISpecies[];
}

const AnimalTable = (props: IProps) => {
  const { animals, meta, enclosures, species } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IAnimals | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);

  const columns = [
    {
      title: "STT",
      render: (_: any, _record: IAnimals, index: number) =>
        index + 1 + (meta.currentPage - 1) * meta.itemsPerPage,
    },
    { title: "ID", dataIndex: "id", hidden: true },
    {
      title: "Name",
      dataIndex: "name",
      render: (name: string, record: IAnimals) => (
        <a
          onClick={() => {
            setDetailId(record.id);
            setIsDetailModalOpen(true);
          }}
          style={{ color: "#1890ff", cursor: "pointer" }}
        >
          {name}
        </a>
      ),
    },
    { title: "Birth Date", dataIndex: "birth_date" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Health Status", dataIndex: "health_status" },
    {
      title: "Actions",
      render: (_: any, record: IAnimals) => (
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
            title="Xác nhận xóa animal"
            description="Bạn có chắc chắn muốn xóa animal này?"
            onConfirm={async () => await handleDeleteAnimalAction(record.id)}
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
        <span>Manage Animals</span>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Animal
        </Button>
      </div>
      <Table
        bordered
        dataSource={animals}
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
      <AnimalCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        enclosures={enclosures}
        species={species}
      />
      <AnimalUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        enclosures={enclosures}
        species={species}
      />
      <AnimalDetail
        isDetailModalOpen={isDetailModalOpen}
        setIsDetailModalOpen={setIsDetailModalOpen}
        animalId={detailId || 0}
      />
    </>
  );
};

export default AnimalTable;
