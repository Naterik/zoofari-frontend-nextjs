"use server";

import { revalidateTag } from "next/cache";
import { sendRequest } from "../utils/api";
import { auth } from "@/auth/auth";

export const fetchSpecies = async (page: number = 1, limit: number = 10) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<ISpecies[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/species`,
    method: "GET",
    queryParams: { page, limit },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: { next: { tags: ["list-species"] } },
  });
  return res;
};

export const fetchSpeciesById = async (id: number) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<ISpecies>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/species/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return res;
};

export const createSpecies = async (data: Partial<ISpecies>) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<ISpecies>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/species`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-species");
  return res;
};

export const updateSpecies = async (
  id: number,
  data: IUpdateSpeciesPayload
) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<ISpecies>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/species/${id}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-species");
  return res;
};

export const deleteSpecies = async (id: number) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<null>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/species/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-species");
  return res;
};
