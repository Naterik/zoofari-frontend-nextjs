"use client";

import { handleUpdateUserAction } from "@/services/user";
import {
  Modal,
  Input,
  Form,
  Row,
  Col,
  message,
  notification,
  Select,
} from "antd";
import { useEffect } from "react";

interface IRole {
  id: number;
  name: string;
  description: string;
}

interface IUpdateUserPayload {
  name?: string;
  phone?: string;
  roleIds?: number[];
  isActive?: boolean;
}

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: IUserModel | null;
  setDataUpdate: (v: IUserModel | null) => void;
  roles: IRole[];
}

const UserUpdate = (props: IProps) => {
  const {
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
    roles,
  } = props;
  const [form] =
    Form.useForm<Partial<IUserModel & { selectedRoleId: number }>>();

  // Update form fields when dataUpdate changes and modal is open
  useEffect(() => {
    if (isUpdateModalOpen) {
      setTimeout(() => {
        if (dataUpdate) {
          const userRoleId = dataUpdate.userRoles?.[0]?.roleId || undefined;
          form.setFieldsValue({
            email: dataUpdate.email,
            name: dataUpdate.name,
            phone: dataUpdate.phone,
            selectedRoleId: userRoleId,
          });
        } else {
          form.resetFields();
        }
      }, 0);
    }
  }, [dataUpdate, isUpdateModalOpen]);

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
    form.resetFields();
  };

  const onFinish = async (
    values: Partial<IUserModel & { selectedRoleId: number }>
  ) => {
    if (!dataUpdate) {
      notification.error({
        message: "Lỗi",
        description: "Không có người dùng nào được chọn để cập nhật",
      });
      return;
    }

    const { name, phone, address, gender, dateOfBirth, selectedRoleId } =
      values;

    const payload: IUpdateUserPayload = {
      name,
      phone,
      roleIds: selectedRoleId ? [selectedRoleId] : undefined,
    };

    const res = await handleUpdateUserAction(String(dataUpdate.id), payload);

    if (res?.data) {
      handleCloseUpdateModal();
      message.success("Cập nhật người dùng thành công");
    } else {
      notification.error({
        message: "Lỗi cập nhật người dùng",
        description: res?.message || "Đã có lỗi xảy ra",
      });
    }
  };

  return (
    <Modal
      title="Cập nhật người dùng"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseUpdateModal}
      maskClosable={false}
    >
      <Form
        form={form}
        name="updateUserForm"
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[15, 15]}>
          <Col span={24} md={12}>
            <Form.Item label="Email" name="email">
              <Input type="email" disabled />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Số điện thoại" name="phone">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Vai trò" name="selectedRoleId">
              <Select
                placeholder="Chọn vai trò"
                options={roles.map((role) => ({
                  value: role.id,
                  label: role.name,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserUpdate;
