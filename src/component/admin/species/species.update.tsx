"use client";

import { updateSpecies } from "@/services/species";
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

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: ISpecies | null;
  setDataUpdate: (v: ISpecies | null) => void;
}

const SpeciesUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;
  const [form] = Form.useForm<Partial<ISpecies>>();
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
            scientific_name: dataUpdate.scientific_name,
            description: dataUpdate.description,
            conservation_status: dataUpdate.conservation_status,
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

  const onFinish = async (values: Partial<ISpecies>) => {
    if (!dataUpdate) {
      notification.error({
        message: "Lỗi",
        description: "Không có species nào được chọn để cập nhật",
      });
      return;
    }

    setSubmitting(true);
    const res = await updateSpecies(dataUpdate.id, {
      name: values.name,
      scientific_name: values.scientific_name,
      description: values.description,
      conservation_status: values.conservation_status,
    });

    if (res?.data) {
      handleCloseUpdateModal();
      message.success("Cập nhật species thành công");
      router.push(`${pathname}?${searchParams.toString()}`); // Refresh the page
    } else {
      notification.error({
        message: "Lỗi cập nhật species",
        description: res?.message || "Đã có lỗi xảy ra",
      });
    }
    setSubmitting(false);
  };

  return (
    <Modal
      title="Cập nhật Species"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseUpdateModal}
      okButtonProps={{ loading: submitting, disabled: submitting }}
      maskClosable={false}
      transitionName=""
    >
      <Form
        form={form}
        name="updateSpeciesForm"
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

export default SpeciesUpdate;
