"use client";

import { Descriptions, Divider, Drawer, Upload, Image } from "antd";
import { useEffect, useState } from "react";
import type { GetProp, UploadFile, UploadProps } from "antd";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { handleGetAnimalDetails } from "@/services/animal";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface IProps {
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: (v: boolean) => void;
  animalId: number;
}

const AnimalDetail = ({
  isDetailModalOpen,
  setIsDetailModalOpen,
  animalId,
}: IProps) => {
  const [animal, setAnimal] = useState<IAnimals | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (isDetailModalOpen && animalId) {
      const fetchDetails = async () => {
        const res = await handleGetAnimalDetails(animalId);
        if (res?.data) {
          setAnimal(res.data);
        } else {
          console.error("Failed to fetch animal details:", res);
        }
      };
      fetchDetails();
    }
  }, [isDetailModalOpen, animalId]);

  useEffect(() => {
    if (animal && animal.images) {
      const imgSlider: UploadFile[] = animal.images.map((img) => ({
        uid: uuidv4(),
        name: img.description || `image-${img.id}`,
        status: "done",
        url: img.url,
      }));
      setFileList(imgSlider);
    }
  }, [animal]);

  const onClose = () => {
    setIsDetailModalOpen(false);
    setAnimal(null);
    setFileList([]);
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Drawer
      title="Chi tiết động vật"
      width={"70vw"}
      onClose={onClose}
      open={isDetailModalOpen}
    >
      {animal && (
        <>
          <Descriptions title="Thông tin động vật" bordered column={2}>
            <Descriptions.Item label="Id">{animal.id}</Descriptions.Item>
            <Descriptions.Item label="Tên">{animal.name}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {dayjs(animal.birth_date).format("YYYY-MM-DD")}
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính">
              {animal.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Tình trạng sức khỏe">
              {animal.health_status}
            </Descriptions.Item>
            <Descriptions.Item label="Loài">
              {animal.species?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Chuồng">
              {animal.enclosure?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {dayjs(animal.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {dayjs(animal.updated_at).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Hình ảnh động vật</Divider>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            showUploadList={{ showRemoveIcon: false }}
          />
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </>
      )}
    </Drawer>
  );
};

export default AnimalDetail;
