"use client";

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table, TablePaginationConfig } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import SpeciesCreate from "./species.create";
import SpeciesUpdate from "./species.update";
import { deleteSpecies } from "@/services/species";

interface IProps {
  species: ISpecies[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    itemCount: number;
  };
}

const SpeciesTable = (props: IProps) => {
  const { species: initialSpecies, meta: initialMeta } = props;
  const [species, setSpecies] = useState<ISpecies[]>(initialSpecies);
  const [meta, setMeta] = useState(initialMeta);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<ISpecies | null>(null);

  useEffect(() => {
    setSpecies(initialSpecies);
    setMeta(initialMeta);
  }, [initialSpecies, initialMeta]);

  const columns = [
    {
      title: "STT",
      render: (_: any, _record: ISpecies, index: number) => {
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
      title: "Tên khoa học",
      dataIndex: "scientific_name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Tình trạng bảo tồn",
      dataIndex: "conservation_status",
    },
    {
      title: "Hành động",
      render: (_: any, record: ISpecies) => {
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
              title={"Xác nhận xóa species"}
              description={"Bạn có chắc chắn muốn xóa species này?"}
              onConfirm={async () => await handleDeleteSpecies(record.id)}
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

  const handleDeleteSpecies = async (id: number) => {
    const res = await deleteSpecies(id);
    if (res?.statusCode === 200) {
      replace(`${pathname}?${searchParams.toString()}`); // Refresh the page
    } else {
      console.error("Lỗi khi xóa species:", res?.message);
    }
  };

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
        <span>Quản lý Species</span>
        <Button onClick={() => setIsCreateModalOpen(true)}>Tạo mới</Button>
      </div>
      {species.length === 0 ? (
        <div>Không có dữ liệu để hiển thị</div>
      ) : (
        <Table
          bordered
          dataSource={species}
          columns={columns}
          rowKey={"id"}
          pagination={{
            current: meta.currentPage,
            pageSize: meta.itemsPerPage,
            showSizeChanger: true,
            total: meta.totalItems,
            showTotal: (total, range) => (
              <div>
                {range[0]}-{range[1]} trên {total} dòng
              </div>
            ),
          }}
          onChange={onChange}
        />
      )}
      <SpeciesCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <SpeciesUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default SpeciesTable;
