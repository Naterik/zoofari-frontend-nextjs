"use client";

import { Descriptions, Divider, Drawer, Upload, Image } from "antd";
import { useEffect, useState } from "react";
import type { GetProp, UploadFile, UploadProps } from "antd";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { handleGetProductItemDetails } from "@/services/product-item";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface IProps {
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: (v: boolean) => void;
  productItemId: number;
}

const ProductItemsDetail = ({
  isDetailModalOpen,
  setIsDetailModalOpen,
  productItemId,
}: IProps) => {
  const [productItem, setProductItem] = useState<IProductItem | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (isDetailModalOpen && productItemId) {
      const fetchDetails = async () => {
        const res = await handleGetProductItemDetails(productItemId);
        if (res?.data) {
          setProductItem(res.data);
        } else {
          console.error("Failed to fetch product item details:", res);
        }
      };
      fetchDetails();
    }
  }, [isDetailModalOpen, productItemId]);

  useEffect(() => {
    if (productItem && productItem.images) {
      const imgSlider: UploadFile[] = productItem.images.map((img) => ({
        uid: uuidv4(),
        name: img.description || `image-${img.id}`,
        status: "done",
        url: img.url,
      }));
      setFileList(imgSlider);
    }
  }, [productItem]);

  const onClose = () => {
    setIsDetailModalOpen(false);
    setProductItem(null);
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
      title="Chi tiết product item"
      width={"70vw"}
      onClose={onClose}
      open={isDetailModalOpen}
    >
      {productItem && (
        <>
          <Descriptions title="Thông tin product item" bordered column={2}>
            <Descriptions.Item label="Id">{productItem.id}</Descriptions.Item>
            <Descriptions.Item label="Tiêu đề">
              {productItem.title}
            </Descriptions.Item>
            <Descriptions.Item label="Giá cơ bản">
              {productItem.basePrice}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {productItem.description}
            </Descriptions.Item>
            <Descriptions.Item label="Mã sản phẩm">
              {productItem.code}
            </Descriptions.Item>
            <Descriptions.Item label="Số lượng tồn kho">
              {productItem.stock}
            </Descriptions.Item>
            <Descriptions.Item label="Sản phẩm">
              {productItem.product?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {dayjs(productItem.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {dayjs(productItem.updated_at).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">Hình ảnh product item</Divider>
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

export default ProductItemsDetail;
