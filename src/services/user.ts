"use server";
import { revalidateTag } from "next/cache";
import { sendRequest } from "../utils/api";
import { auth } from "@/auth/auth";

// Tạo người dùng
export const handleCreateUserAction = async (data: Partial<IUserModel>) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IUserModel>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-users");
  return res;
};

// Cập nhật người dùng
export const handleUpdateUserAction = async (
  id: string,
  data: Partial<IUserModel>
) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IUserModel>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-users");
  return res;
};

// Xóa người dùng
export const handleDeleteUserAction = async (id: string) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IUserModel>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-users");
  return res;
};

// Lấy danh sách người dùng
export const fetchUsers = async (page: number = 1, limit: number = 10) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IUserModel>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
    method: "GET",
    queryParams: { page, limit },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: { next: { tags: ["list-users"] } },
  });
  return res;
};
