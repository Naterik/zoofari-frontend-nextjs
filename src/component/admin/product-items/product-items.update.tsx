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
import { useEffect, useState } from "react";

import { RcFile } from "antd/es/upload";
import {
  handleDeleteProductItemImage,
  handleUpdateProductItemAction,
} from "@/services/product-item";

interface IProductItemForm extends Omit<Partial<IProductItem>, "product"> {
  productId?: number;
}

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: IProductItem | null;
  setDataUpdate: (v: IProductItem | null) => void;
  products: IProduct[];
}

const MAX_UPLOAD_IMAGE_SIZE = 2; // 2MB

const ProductItemsUpdate = ({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  dataUpdate,
  setDataUpdate,
  products,
}: IProps) => {
  const [form] = Form.useForm<IProductItemForm>();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (isUpdateModalOpen && dataUpdate) {
      setTimeout(() => {
        form.setFieldsValue({
          title: dataUpdate.title,
          basePrice: dataUpdate.basePrice,
          description: dataUpdate.description,
          code: dataUpdate.code,
          stock: dataUpdate.stock,
          productId: dataUpdate.product?.id,
        });

        const existingImages =
          dataUpdate.images?.map((image: IImage) => ({
            uid: image.id.toString(),
            name: image.description || `image-${image.id}`,
            status: "done",
            url: image.url,
          })) || [];

        setFileList(existingImages);
      }, 0);
    }
  }, [isUpdateModalOpen, dataUpdate, form]);

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
    form.resetFields();
    setFileList([]);
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
      if (file.originFileObj && !file.url) {
        return checkFile(file.originFileObj);
      }
      return true;
    });

    setFileList(validFiles);
  };

  const onFinish = async (values: IProductItemForm) => {
    if (!dataUpdate) {
      notification.error({
        message: "Error",
        description: "No product item selected for update",
      });
      return;
    }

    try {
      await form.validateFields();

      const { title, basePrice, description, code, stock, productId } = values;

      const newFiles = fileList
        .filter((file: any) => !file.url)
        .map((file: any) => file.originFileObj);

      const payload: IUpdateProductItemPayload = {
        title,
        basePrice,
        description,
        code,
        stock,
        productId,
      };

      const res = await handleUpdateProductItemAction(
        dataUpdate.id,
        payload,
        newFiles
      );

      if (res?.statusCode === 200) {
        handleCloseUpdateModal();
        message.success(res.message || "Cập nhật product item thành công!");
      } else {
        notification.error({
          message: "Lỗi khi cập nhật product item",
          description: res?.message || "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    } catch (error: any) {
      if (error.errorFields) {
        return;
      }
      notification.error({
        message: "Lỗi khi cập nhật product item",
        description: error.message || "Đã xảy ra lỗi không mong muốn",
      });
    }
  };

  const handleRemoveImage = async (file: any) => {
    if (!dataUpdate) return false;

    if (file.url) {
      try {
        const imageId = parseInt(file.uid, 10);
        const res = await handleDeleteProductItemImage(dataUpdate.id, imageId);
        if (res.statusCode === 200) {
          message.success("Xóa ảnh thành công!");
          return true;
        } else {
          notification.error({
            message: "Lỗi khi xóa ảnh",
            description: res.message || "Có lỗi xảy ra, vui lòng thử lại",
          });
          return false;
        }
      } catch (error: any) {
        notification.error({
          message: "Lỗi khi xóa ảnh",
          description: error.message || "Đã xảy ra lỗi không mong muốn",
        });
        return false;
      }
    }
    return true;
  };

  return (
    <Modal
      title="Cập nhật product item"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseUpdateModal}
      maskClosable={false}
    >
      <Form
        name="updateProductItemForm"
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
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giá cơ bản"
              name="basePrice"
              rules={[{ required: true, message: "Vui lòng nhập giá cơ bản!" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <Input />
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
                onRemove={handleRemoveImage}
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

export default ProductItemsUpdate;
