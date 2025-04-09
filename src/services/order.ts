"use server";

import { auth } from "@/auth/auth";
import { revalidateTag } from "next/cache";

export const sendRequest = async <T>(req: IRequest): Promise<T> => {
  const session = await auth();
  const headers = req.headers || {};

  if (!(req.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  headers["Authorization"] = `Bearer ${session?.user?.access_token}`;

  const config: RequestInit = {
    method: req.method,
    headers,
    body: req.body instanceof FormData ? req.body : JSON.stringify(req.body),
    credentials: req.useCredentials ? "include" : "omit",
    next: req.nextOption,
  };

  const url = new URL(req.url);
  if (req.queryParams) {
    Object.entries(req.queryParams).forEach(([key, value]) =>
      url.searchParams.append(key, String(value))
    );
  }

  const res = await fetch(url.toString(), config);
  return res.json();
};

export const fetchOrders = async (page: number = 1, limit: number = 10) => {
  const res = await sendRequest<IBackendRes<{ orders: IOrder[]; meta: any }>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`,
    method: "GET",
    queryParams: { page, limit },
    nextOption: { next: { tags: ["list-orders"] } },
  });
  return res;
};

export const handleGetOrderDetails = async (id: number) => {
  const res = await sendRequest<IBackendRes<IOrderDetail>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/details`,
    method: "GET",
    nextOption: { next: { tags: [`order-${id}`] } },
  });
  return res;
};

export const handleCreateOrderAction = async (data: ICreateOrder) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`,
    method: "POST",
    body: data,
  });

  revalidateTag("list-orders");
  return res;
};

export const handleUpdateOrderAction = async (
  id: number,
  data: Partial<IOrder>
) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`,
    method: "PUT",
    body: data,
  });

  revalidateTag("list-orders");
  return res;
};

export const handleDeleteOrderAction = async (id: number) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`,
    method: "DELETE",
  });

  revalidateTag("list-orders");
  return res;
};

// Hàm lấy danh sách sản phẩm
export const fetchProducts = async () => {
  const res = await sendRequest<IBackendRes<IProduct[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
    method: "GET",
  });
  return res;
};

// Hàm lấy danh sách product items
export const fetchProductItems = async () => {
  const res = await sendRequest<IBackendRes<IProductItem[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-items`,
    method: "GET",
  });
  return res;
};

// Hàm lấy danh sách product item options theo productItemId
export const fetchProductItemOptions = async (productItemId: number) => {
  const res = await sendRequest<IBackendRes<IProductItemOption[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-item-options/items/${productItemId}/options`,
    method: "GET",
  });
  return res;
};

// Hàm kiểm tra userId có tồn tại hay không
export const checkUserExists = async (userId: number) => {
  const res = await sendRequest<IBackendRes<IUserModel>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
    method: "GET",
  });
  return res;
};
