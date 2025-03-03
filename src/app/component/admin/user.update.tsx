import { handleUpdateUserAction } from "@/services/action";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";
import { useEffect } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: IUserModel | null;
  setDataUpdate: (v: IUserModel | null) => void;
}

const UserUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;
  const [form] = Form.useForm<Partial<IUserModel>>();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        email: dataUpdate.email,
        name: dataUpdate.name,
        phone: dataUpdate.phone,
        address: dataUpdate.address,
        gender: dataUpdate.gender,
      });
    } else {
      form.resetFields();
    }
  }, [dataUpdate, form]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values: Partial<IUserModel>) => {
    if (!dataUpdate) {
      notification.error({
        message: "Error",
        description: "No user selected for update",
      });
      return;
    }

    const { name, phone, address, gender, dateOfBirth, isActive, role } =
      values;
    const res = await handleUpdateUserAction(dataUpdate.id, {
      name,
      phone,
      address,
      gender,
      dateOfBirth,
      isActive,
      role,
    });

    if (res?.data) {
      handleCloseUpdateModal();
      message.success("Update user succeed");
    } else {
      notification.error({
        message: "Update User error",
        description: res?.message || "Something went wrong",
      });
    }
  };

  return (
    <Modal
      title="Update a user"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseUpdateModal}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24} md={12}>
            <Form.Item label="Email" name="email">
              <Input type="email" disabled />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Gender" name="gender">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserUpdate;
