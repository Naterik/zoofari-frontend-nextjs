"use client";

import {
  Modal,
  Input,
  Form,
  Row,
  Col,
  message,
  notification,
  Upload,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

import { RcFile } from "antd/es/upload";
import { handleCreateProductItemAction } from "@/services/product-item";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
  products: IProduct[];
}

const MAX_UPLOAD_IMAGE_SIZE = 2; // 2MB

const ProductItemsCreate = ({
  isCreateModalOpen,
  setIsCreateModalOpen,
  products,
}: IProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleCloseCreateModal = () => {
    form.resetFields();
    setFileList([]);
    setIsCreateModalOpen(false);
  };

  const checkFile = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < MAX_UPLOAD_IMAGE_SIZE;

    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể upload file JPG/PNG!");
      return false;
    }
    if (!isLt2M) {
      message.error(`Ảnh phải nhỏ hơn ${MAX_UPLOAD_IMAGE_SIZE}MB!`);
      return false;
    }
    return true;
  };

  const handleUploadChange = ({
    fileList: newFileList,
  }: {
    fileList: any[];
  }) => {
    const validFiles = newFileList.filter((file: any) => {
      if (file.originFileObj) {
        return checkFile(file.originFileObj);
      }
      return true;
    });

    setFileList(validFiles);
  };

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();

      const files = fileList.map((file: any) => file.originFileObj);
      const res = await handleCreateProductItemAction(values, files);

      if (res?.statusCode === 201) {
        handleCloseCreateModal();
        message.success(res.message || "Tạo product item thành công!");
      } else {
        notification.error({
          message: "Lỗi khi tạo product item",
          description: res?.message || "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    } catch (error: any) {
      if (error.errorFields) {
        return;
      }
      notification.error({
        message: "Lỗi khi tạo product item",
        description: error.message || "Đã xảy ra lỗi không mong muốn",
      });
    }
  };

  return (
    <Modal
      title="Thêm product item mới"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseCreateModal}
      maskClosable={false}
    >
      <Form
        name="createProductItemForm"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề product item!",
                },
              ]}
            >
              <Input placeholder="Nhập tiêu đề product item" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giá cơ bản"
              name="basePrice"
              rules={[{ required: true, message: "Vui lòng nhập giá cơ bản!" }]}
            >
              <Input type="number" placeholder="Nhập giá cơ bản" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <Input placeholder="Nhập mô tả" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Mã sản phẩm"
              name="code"
              rules={[
                { required: true, message: "Vui lòng nhập mã sản phẩm!" },
              ]}
            >
              <Input placeholder="Nhập mã sản phẩm" />
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
              <Input type="number" placeholder="Nhập số lượng tồn kho" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Sản phẩm"
              name="productId"
              rules={[{ required: true, message: "Vui lòng chọn sản phẩm!" }]}
            >
              <Select placeholder="Chọn sản phẩm">
                {products.map((p) => (
                  <Select.Option key={p.id} value={p.id}>
                    {p.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Hình ảnh" name="images">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false}
              >
                {fileList.length >= 10 ? null : <PlusOutlined />}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductItemsCreate;
