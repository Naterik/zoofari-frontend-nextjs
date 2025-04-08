"use server";

import { revalidateTag } from "next/cache";
import { sendRequest } from "../utils/api";
import { auth } from "@/auth/auth";

export const fetchEnclosures = async (page: number = 1, limit: number = 10) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IEnclosure[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/enclosures`,
    method: "GET",
    queryParams: { page, limit },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: { next: { tags: ["list-enclosures"] } },
  });
  return res;
};

export const fetchEnclosureById = async (id: number) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IEnclosure>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/enclosures/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return res;
};

export const createEnclosure = async (data: Partial<IEnclosure>) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IEnclosure>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/enclosures`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-enclosures");
  return res;
};

export const updateEnclosure = async (
  id: number,
  data: IUpdateEnclosurePayload
) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IEnclosure>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/enclosures/${id}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-enclosures");
  return res;
};

export const deleteEnclosure = async (id: number) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<null>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/enclosures/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-enclosures");
  return res;
};
