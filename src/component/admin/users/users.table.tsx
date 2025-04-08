"use client";

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table, TablePaginationConfig } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import UserCreate from "./users.create";
import UserUpdate from "./users.update";
import { handleDeleteUserAction } from "@/services/user";

interface IRole {
  id: number;
  name: string;
  description: string;
}

interface IProps {
  users: IUserModel[];
  meta: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    itemCount: number;
  };
  roles: IRole[];
}

const UserTable = (props: IProps) => {
  const { users: initialUsers, meta: initialMeta, roles } = props;
  const [users, setUsers] = useState<IUserModel[]>(initialUsers);
  const [meta, setMeta] = useState(initialMeta);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IUserModel | null>(null);

  // Sync props with state after hydration
  useEffect(() => {
    setUsers(initialUsers);
    setMeta(initialMeta);
  }, [initialUsers, initialMeta]);

  const columns = [
    {
      title: "STT",
      render: (_: any, _record: IUserModel, index: number) => {
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Vai trò",
      render: (_: any, record: IUserModel) => {
        return record.userRoles?.map((ur) => ur.role.name).join(", ") || "N/A";
      },
    },
    {
      title: "Hành động",
      render: (_: any, record: IUserModel) => {
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
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này?"}
              onConfirm={async () =>
                await handleDeleteUserAction(String(record.id))
              }
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
        <span>Quản lý người dùng</span>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Tạo người dùng
        </Button>
      </div>
      {users.length === 0 ? (
        <div>Không có dữ liệu để hiển thị</div>
      ) : (
        <Table
          bordered
          dataSource={users}
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
      <UserCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <UserUpdate
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        roles={roles}
      />
    </>
  );
};

export default UserTable;
