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

export const handleDeleteProductItemImage = async (
  productItemId: number,
  imageId: number
) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-items/${productItemId}/images/${imageId}`,
    method: "DELETE",
  });
  revalidateTag("list-product-items");
  return res;
};

export const fetchProductItems = async (
  page: number = 1,
  limit: number = 10
) => {
  const res = await sendRequest<IBackendRes<IProductItem[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-items`,
    method: "GET",
    queryParams: { page, limit },
    nextOption: { next: { tags: ["list-product-items"] } },
  });
  return res;
};

export const handleCreateProductItemAction = async (
  data: Partial<IProductItem>,
  files?: File[]
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });

  if (files && files.length > 0) {
    files.forEach((file) => formData.append("files", file));
  }

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-items`,
    method: "POST",
    body: formData,
  });

  revalidateTag("list-product-items");
  return res;
};

export const handleUpdateProductItemAction = async (
  id: number,
  data: Partial<IProductItem>,
  files?: File[]
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });

  if (files && files.length > 0) {
    files.forEach((file) => formData.append("files", file));
  }

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-items/${id}`,
    method: "PATCH",
    body: formData,
  });

  revalidateTag("list-product-items");
  return res;
};

export const handleDeleteProductItemAction = async (id: number) => {
  const res = await sendRequest<IBackendRes<IProductItem>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-items/${id}`,
    method: "DELETE",
  });
  revalidateTag("list-product-items");
  return res;
};

export const handleGetProductItemDetails = async (id: number) => {
  const res = await sendRequest<IBackendRes<IProductItem>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-items/${id}/details`,
    method: "GET",
    nextOption: { next: { tags: [`product-item-${id}`] } },
  });
  return res;
};
