"use client";

import { updateEnclosure } from "@/services/enclosures";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: IEnclosure | null;
  setDataUpdate: (v: IEnclosure | null) => void;
}

const EnclosuresUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;
  const [form] = Form.useForm<Partial<IEnclosure>>();
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
            location: dataUpdate.location,
            capacity: dataUpdate.capacity,
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

  const onFinish = async (values: Partial<IEnclosure>) => {
    if (!dataUpdate) {
      notification.error({
        message: "Lỗi",
        description: "Không có enclosure nào được chọn để cập nhật",
      });
      return;
    }

    setSubmitting(true);

    // Convert capacity to a number if it exists
    const capacity =
      values.capacity !== undefined ? Number(values.capacity) : undefined;
    if (capacity !== undefined && isNaN(capacity)) {
      notification.error({
        message: "Lỗi cập nhật enclosure",
        description: "Sức chứa phải là một số hợp lệ",
      });
      setSubmitting(false);
      return;
    }

    const res = await updateEnclosure(dataUpdate.id, {
      name: values.name,
      location: values.location,
      capacity: capacity,
    });

    if (res?.data?.id) {
      handleCloseUpdateModal();
      message.success("Cập nhật enclosure thành công");
      router.push(`${pathname}?${searchParams.toString()}`); // Refresh the page
    } else {
      notification.error({
        message: "Lỗi cập nhật enclosure",
        description: res?.message || "Đã có lỗi xảy ra",
      });
    }
    setSubmitting(false);
  };

  return (
    <Modal
      title="Cập nhật Enclosure"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseUpdateModal}
      okButtonProps={{ loading: submitting, disabled: submitting }}
      maskClosable={false}
      transitionName=""
    >
      <Form
        form={form}
        name="updateEnclosureForm"
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

export default EnclosuresUpdate;
