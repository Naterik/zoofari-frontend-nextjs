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
import { handleCreateAnimalAction } from "@/services/animal";
import { RcFile } from "antd/es/upload";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
  enclosures: IEnclosure[];
  species: ISpecies[];
}

const MAX_UPLOAD_IMAGE_SIZE = 2; // 2MB

const AnimalCreate = ({
  isCreateModalOpen,
  setIsCreateModalOpen,
  enclosures,
  species,
}: IProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleCloseCreateModal = () => {
    form.resetFields();
    setFileList([]);
    setIsCreateModalOpen(false);
  };

  // Hàm kiểm tra file
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

  // Xử lý khi người dùng chọn file
  const handleUploadChange = ({
    fileList: newFileList,
  }: {
    fileList: any[];
  }) => {
    // Lọc chỉ giữ lại các file hợp lệ
    const validFiles = newFileList.filter((file: any) => {
      if (file.originFileObj) {
        // Chỉ kiểm tra file mới được upload
        return checkFile(file.originFileObj);
      }
      return true; // Giữ lại các file đã có (nếu có)
    });

    setFileList(validFiles);
  };

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();

      const files = fileList.map((file: any) => file.originFileObj);
      const res = await handleCreateAnimalAction(values, files);

      if (res?.statusCode === 201) {
        handleCloseCreateModal();
        message.success(res.message || "Tạo động vật thành công!");
      } else {
        notification.error({
          message: "Lỗi khi tạo động vật",
          description: res?.message || "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    } catch (error: any) {
      if (error.errorFields) {
        return;
      }
      notification.error({
        message: "Lỗi khi tạo động vật",
        description: error.message || "Đã xảy ra lỗi không mong muốn",
      });
    }
  };

  return (
    <Modal
      title="Thêm động vật mới"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseCreateModal}
      maskClosable={false}
    >
      <Form
        name="createAnimalForm"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Form.Item
              label="Tên"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên động vật!" },
              ]}
            >
              <Input placeholder="Nhập tên động vật" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Ngày sinh"
              name="birth_date"
              rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Select placeholder="Chọn giới tính">
                <Select.Option value="Male">Đực</Select.Option>
                <Select.Option value="Female">Cái</Select.Option>
                <Select.Option value="Unknown">Không xác định</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Tình trạng sức khỏe"
              name="health_status"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tình trạng sức khỏe!",
                },
              ]}
            >
              <Input placeholder="Nhập tình trạng sức khỏe" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Loài"
              name="species_id"
              rules={[{ required: true, message: "Vui lòng chọn loài!" }]}
            >
              <Select placeholder="Chọn loài">
                {species.map((s) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Chuồng"
              name="enclosure_id"
              rules={[{ required: true, message: "Vui lòng chọn chuồng!" }]}
            >
              <Select placeholder="Chọn chuồng">
                {enclosures.map((e) => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.name}
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
                beforeUpload={() => false} // Ngăn upload tự động, xử lý trong onChange
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

export default AnimalCreate;
