"use client";

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
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createProduct } from "@/services/product";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const ProductCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;
  const [form] = Form.useForm<IUpdateProductPayload>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: IUpdateProductPayload) => {
    setSubmitting(true);
    const res = await createProduct({
      name: values.name,
      description: values.description,
      stock: values.stock,
      status: values.status,
      animal_id: values.animal_id,
    });

    if (res?.data) {
      handleCloseCreateModal();
      message.success("Tạo product thành công");
      router.push(`${pathname}?${searchParams.toString()}`);
    } else {
      notification.error({
        message: "Lỗi tạo product",
        description: res?.message || "Đã có lỗi xảy ra",
      });
    }
    setSubmitting(false);
  };

  return (
    <Modal
      title="Tạo Product"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseCreateModal}
      okButtonProps={{ loading: submitting, disabled: submitting }}
      maskClosable={false}
      transitionName=""
    >
      <Form
        form={form}
        name="createProductForm"
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Số lượng tồn kho"
              name="stock"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng tồn kho!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Trạng thái" name="status">
              <Select
                options={[
                  { value: "Available", label: "Available" },
                  { value: "OutOfStock", label: "Out of Stock" },
                  { value: "Discontinued", label: "Discontinued" },
                ]}
                placeholder="Chọn trạng thái"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Animal ID"
              name="animal_id"
              rules={[{ required: true, message: "Vui lòng nhập Animal ID!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductCreate;
