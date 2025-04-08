"use client";

import { createEnclosure } from "@/services/enclosures";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const EnclosuresCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;
  const [form] = Form.useForm<Partial<IEnclosure>>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: Partial<IEnclosure>) => {
    setSubmitting(true);

    // Convert capacity to a number
    const capacity = Number(values.capacity);
    if (isNaN(capacity)) {
      notification.error({
        message: "Lỗi tạo enclosure",
        description: "Sức chứa phải là một số hợp lệ",
      });
      setSubmitting(false);
      return;
    }

    const res = await createEnclosure({
      name: values.name,
      location: values.location,
      capacity: capacity, // Send as a number
    });

    if (res?.data?.id) {
      handleCloseCreateModal();
      message.success("Tạo enclosure thành công");
      router.push(`${pathname}?${searchParams.toString()}`); // Refresh the page
    } else {
      notification.error({
        message: "Lỗi tạo enclosure",
        description: res?.message || "Đã có lỗi xảy ra",
      });
    }
    setSubmitting(false);
  };

  return (
    <Modal
      title="Tạo Enclosure"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseCreateModal}
      okButtonProps={{ loading: submitting, disabled: submitting }}
      maskClosable={false}
      transitionName=""
    >
      <Form
        form={form}
        name="createEnclosureForm"
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
            <Form.Item
              label="Vị trí"
              name="location"
              rules={[{ required: true, message: "Vui lòng nhập vị trí!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Sức chứa"
              name="capacity"
              rules={[
                { required: true, message: "Vui lòng nhập sức chứa!" },
                {
                  validator: (_, value) => {
                    const num = Number(value);
                    if (isNaN(num)) {
                      return Promise.reject("Sức chứa phải là một số!");
                    }
                    if (num <= 0) {
                      return Promise.reject("Sức chứa phải là số dương!");
                    }
                    if (!Number.isInteger(num)) {
                      return Promise.reject("Sức chứa phải là số nguyên!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input type="number" min={1} step={1} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EnclosuresCreate;
