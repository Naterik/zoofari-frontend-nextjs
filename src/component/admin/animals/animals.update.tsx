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
import {
  handleUpdateAnimalAction,
  handleDeleteAnimalImage,
} from "@/services/animal";
import { RcFile } from "antd/es/upload";

// Define a custom type for the form to include species_id and enclosure_id
interface IAnimalForm extends Omit<Partial<IAnimals>, "species" | "enclosure"> {
  species_id?: number;
  enclosure_id?: number;
}

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: IAnimals | null;
  setDataUpdate: (v: IAnimals | null) => void;
  enclosures: IEnclosure[];
  species: ISpecies[];
}

const MAX_UPLOAD_IMAGE_SIZE = 2; // 2MB

const AnimalUpdate = ({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  dataUpdate,
  setDataUpdate,
  enclosures,
  species,
}: IProps) => {
  const [form] = Form.useForm<IAnimalForm>();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (isUpdateModalOpen && dataUpdate) {
      setTimeout(() => {
        form.setFieldsValue({
          name: dataUpdate.name,
          birth_date: dataUpdate.birth_date,
          gender: dataUpdate.gender,
          health_status: dataUpdate.health_status,
          species_id: dataUpdate.species?.id,
          enclosure_id: dataUpdate.enclosure?.id,
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
      if (file.originFileObj && !file.url) {
        // Chỉ kiểm tra file mới được upload (không có url)
        return checkFile(file.originFileObj);
      }
      return true; // Giữ lại các file đã có (có url)
    });

    setFileList(validFiles);
  };

  const onFinish = async (values: IAnimalForm) => {
    if (!dataUpdate) {
      notification.error({
        message: "Error",
        description: "No animal selected for update",
      });
      return;
    }

    try {
      await form.validateFields();

      const {
        name,
        birth_date,
        gender,
        health_status,
        species_id,
        enclosure_id,
      } = values;

      const newFiles = fileList
        .filter((file: any) => !file.url)
        .map((file: any) => file.originFileObj);

      const payload: IUpdateAnimalPayload = {
        name,
        birth_date,
        gender,
        health_status,
        species_id,
        enclosure_id,
      };

      const res = await handleUpdateAnimalAction(
        dataUpdate.id,
        payload,
        newFiles
      );

      if (res?.statusCode === 200) {
        handleCloseUpdateModal();
        message.success(res.message || "Cập nhật động vật thành công!");
      } else {
        notification.error({
          message: "Lỗi khi cập nhật động vật",
          description: res?.message || "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    } catch (error: any) {
      if (error.errorFields) {
        return;
      }
      notification.error({
        message: "Lỗi khi cập nhật động vật",
        description: error.message || "Đã xảy ra lỗi không mong muốn",
      });
    }
  };

  const handleRemoveImage = async (file: any) => {
    if (!dataUpdate) return false;

    if (file.url) {
      try {
        const imageId = parseInt(file.uid, 10);
        const res = await handleDeleteAnimalImage(dataUpdate.id, imageId);
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
      title="Cập nhật động vật"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={handleCloseUpdateModal}
      maskClosable={false}
    >
      <Form
        name="updateAnimalForm"
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
              <Input />
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
              <Select
                placeholder="Chọn giới tính"
                options={[
                  { value: "Male", label: "Đực" },
                  { value: "Female", label: "Cái" },
                  { value: "Unknown", label: "Không xác định" },
                ]}
              />
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
                onRemove={handleRemoveImage}
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

export default AnimalUpdate;
