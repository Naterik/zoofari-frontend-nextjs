"use client";

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table, TablePaginationConfig } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import EnclosuresCreate from "./enclosures.create";
import EnclosuresUpdate from "./enclosures.update";
import { deleteEnclosure } from "@/services/enclosures";

interface IProps {
  enclosures: IEnclosure[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    itemCount: number;
  };
}

const EnclosuresTable = (props: IProps) => {
  const { enclosures: initialEnclosures, meta: initialMeta } = props;
  const [enclosures, setEnclosures] = useState<IEnclosure[]>(initialEnclosures);
  const [meta, setMeta] = useState(initialMeta);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IEnclosure | null>(null);

  useEffect(() => {
    setEnclosures(initialEnclosures);
    setMeta(initialMeta);
  }, [initialEnclosures, initialMeta]);

  const columns = [
    {
      title: "STT",
      render: (_: any, _record: IEnclosure, index: number) => {
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
      title: "Vị trí",
      dataIndex: "location",
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
    },
    {
      title: "Hành động",
      render: (_: any, record: IEnclosure) => {
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
              title={"Xác nhận xóa enclosure"}
              description={"Bạn có chắc chắn muốn xóa enclosure này?"}
              onConfirm={async () => await handleDeleteEnclosure(record.id)}
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

  const handleDeleteEnclosure = async (id: number) => {
    const res = await deleteEnclosure(id);
    if (res?.statusCode === 200) {
      replace(`${pathname}?${searchParams.toString()}`);
    } else {
      console.error("Lỗi khi xóa enclosure:", res?.message);
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
        <span>Quản lý Enclosures</span>
        <Button
          onClick={() => {
            setIsCreateModalOpen(true);
          }}
        >
          Tạo mới
        </Button>
      </div>
      {enclosures.length === 0 ? (
        <div>Không có dữ liệu để hiển thị</div>
      ) : (
        <Table
          bordered
          dataSource={enclosures}
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
      <EnclosuresCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <EnclosuresUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default EnclosuresTable;
