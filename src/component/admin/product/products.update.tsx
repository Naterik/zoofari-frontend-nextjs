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
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateProduct } from "@/services/product";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: IProduct | null;
  setDataUpdate: (v: IProduct | null) => void;
}

const ProductUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;
  const [form] = Form.useForm<IUpdateProductPayload>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isUpdateModalOpen) {
      setTimeout(() => {
        if (dataUpdate) {
          form.setFieldsValue({
            name: dataUpdate.name,
            description: dataUpdate.description,
            stock: dataUpdate.stock,
            status: dataUpdate.status,
            animal_id: dataUpdate.animal?.id,
          });
        } else {
          form.resetFields();
        }
      }, 0);
    }
  }, [dataUpdate, isUpdateModalOpen, form]);

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
    form.resetFields();
  };

  const onFinish = async (values: IUpdateProductPayload) => {
    if (!dataUpdate) {
      notification.error({
        message: "Lỗi",
        description: "Không có product nào được chọn để cập nhật",
      });
      return;
    }

    setSubmitting(true);
    const res = await updateProduct(dataUpdate.id, {
      name: values.name,
      description: values.description,
      stock: values.stock,
      status: values.status,
      animal_id: values.animal_id,
    });

    if (res?.data) {
      handleCloseUpdateModal();
      message.success("Cập nhật product thành công");
      router.push(`${pathname}?${searchParams.toString()}`);
    } else {
      notification.error({
        message: "Lỗi cập nhật product",
        description: res?.message || "Đã có lỗi xảy ra",
      });
    }
    setSubmitting(false);
  };

  return (
    <Modal
      title="Cập nhật Product"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseUpdateModal}
      okButtonProps={{ loading: submitting, disabled: submitting }}
      maskClosable={false}
      transitionName=""
    >
      <Form
        form={form}
        name="updateProductForm"
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

export default ProductUpdate;
