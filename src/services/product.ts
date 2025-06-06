"use server";

import { revalidateTag } from "next/cache";
import { sendRequest } from "../utils/api";
import { auth } from "@/auth/auth";

export const fetchProducts = async (page: number = 1, limit: number = 10) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IProduct[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
    method: "GET",
    queryParams: { page, limit },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: { next: { tags: ["list-products"] } },
  });
  return res;
};

export const fetchProductById = async (id: number) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IProduct>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return res;
};

export const createProduct = async (data: IUpdateProductPayload) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IProduct>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-products");
  return res;
};

export const updateProduct = async (
  id: number,
  data: IUpdateProductPayload
) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IProduct>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-products");
  return res;
};

export const deleteProduct = async (id: number) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<null>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-products");
  return res;
};
