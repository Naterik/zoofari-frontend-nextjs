"use client";

import { createSpecies } from "@/services/species";
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

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const SpeciesCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;
  const [form] = Form.useForm<Partial<ISpecies>>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: Partial<ISpecies>) => {
    setSubmitting(true);
    const res = await createSpecies({
      name: values.name,
      scientific_name: values.scientific_name,
      description: values.description,
      conservation_status: values.conservation_status,
    });

    if (res?.data) {
      handleCloseCreateModal();
      message.success("Tạo species thành công");
      router.push(`${pathname}?${searchParams.toString()}`);
    } else {
      notification.error({
        message: "Lỗi tạo species",
        description: res?.message || "Đã có lỗi xảy ra",
      });
    }
    setSubmitting(false);
  };

  return (
    <Modal
      title="Tạo Species"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseCreateModal}
      okButtonProps={{ loading: submitting, disabled: submitting }}
      maskClosable={false}
      transitionName=""
    >
      <Form
        form={form}
        name="createSpeciesForm"
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
            <Form.Item label="Tên khoa học" name="scientific_name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tình trạng bảo tồn" name="conservation_status">
              <Select
                options={[
                  { value: "Endangered", label: "Endangered" },
                  { value: "Vulnerable", label: "Vulnerable" },
                  { value: "Least Concern", label: "Least Concern" },
                  { value: "Not Evaluated", label: "Not Evaluated" },
                ]}
                placeholder="Chọn tình trạng bảo tồn"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SpeciesCreate;
