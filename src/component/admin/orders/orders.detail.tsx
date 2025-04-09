"use client";

import { Descriptions, Divider, Drawer, message } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { handleGetOrderDetails } from "@/services/order";

interface IProps {
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: (v: boolean) => void;
  orderDetailId: number;
}

const OrderDetail = ({
  isDetailModalOpen,
  setIsDetailModalOpen,
  orderDetailId,
}: IProps) => {
  const [orderDetail, setOrderDetail] = useState<IOrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDetailModalOpen && orderDetailId) {
      if (orderDetailId <= 0) {
        setError("Invalid order detail ID");
        message.error("Invalid order detail ID");
        return;
      }

      const fetchDetails = async () => {
        try {
          const res = await handleGetOrderDetails(orderDetailId);
          if (res?.data && res.statusCode === 200) {
            setOrderDetail(res.data);
            setError(null);
          } else {
            const errorMessage =
              res?.message || "Failed to fetch order details";
            setError(errorMessage);
            message.error(errorMessage);
            console.error("Failed to fetch order details:", res);
          }
        } catch (error: any) {
          const errorMessage = error.message || "An unexpected error occurred";
          setError(errorMessage);
          message.error(errorMessage);
          console.error("Error fetching order details:", error);
        }
      };
      fetchDetails();
    }
  }, [isDetailModalOpen, orderDetailId]);

  const onClose = () => {
    setIsDetailModalOpen(false);
    setOrderDetail(null);
    setError(null);
  };

  return (
    <Drawer
      title="Chi tiết đơn hàng"
      width={"70vw"}
      onClose={onClose}
      open={isDetailModalOpen}
    >
      {error ? (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      ) : orderDetail ? (
        <>
          <Descriptions title="Thông tin đơn hàng" bordered column={2}>
            <Descriptions.Item label="ID">{orderDetail.id}</Descriptions.Item>
            <Descriptions.Item label="Số lượng">
              {orderDetail.quantity}
            </Descriptions.Item>
            <Descriptions.Item label="Giá">
              {orderDetail.price}
            </Descriptions.Item>
            <Descriptions.Item label="Order ID">
              {orderDetail.order.id}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày đặt hàng">
              {dayjs(orderDetail.order.order_date).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              {orderDetail.order.total_amount}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {orderDetail.order.status}
            </Descriptions.Item>
            <Descriptions.Item label="Người dùng">
              {orderDetail.order.user.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {orderDetail.order.user.email}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {orderDetail.order.user.address}
            </Descriptions.Item>
            <Descriptions.Item label="Sản phẩm">
              {orderDetail.product.name}
            </Descriptions.Item>
            <Descriptions.Item label="Mặt hàng">
              {orderDetail.productItem.title}
            </Descriptions.Item>
            <Descriptions.Item label="Giá cơ bản">
              {orderDetail.productItem.basePrice}
            </Descriptions.Item>
            <Descriptions.Item label="Tùy chọn">
              {orderDetail.productItemOption.title}
            </Descriptions.Item>
            <Descriptions.Item label="Giá bổ sung">
              {orderDetail.productItemOption.additionPrice}
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Drawer>
  );
};

export default OrderDetail;
