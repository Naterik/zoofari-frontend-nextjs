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

export const handleDeleteAnimalImage = async (
  animalId: number,
  imageId: number
) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/animals/${animalId}/images/${imageId}`,
    method: "DELETE",
  });
  revalidateTag("list-animals");
  return res;
};

export const fetchAnimals = async (page: number = 1, limit: number = 10) => {
  const res = await sendRequest<IBackendRes<IAnimals[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/animals`,
    method: "GET",
    queryParams: { page, limit },
    nextOption: { next: { tags: ["list-animals"] } },
  });
  return res;
};

export const handleCreateAnimalAction = async (
  data: Partial<IAnimals>,
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
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/animals`,
    method: "POST",
    body: formData,
  });

  revalidateTag("list-animals");
  return res;
};

export const handleUpdateAnimalAction = async (
  id: number,
  data: Partial<IAnimals>,
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
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/animals/${id}`,
    method: "PATCH",
    body: formData,
  });

  revalidateTag("list-animals");
  return res;
};

export const handleDeleteAnimalAction = async (id: number) => {
  const res = await sendRequest<IBackendRes<IAnimals>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/animals/${id}`,
    method: "DELETE",
  });
  revalidateTag("list-animals");
  return res;
};

export const handleGetAnimalDetails = async (id: number) => {
  const res = await sendRequest<IBackendRes<IAnimals>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/animals/${id}/details`,
    method: "GET",
    nextOption: { next: { tags: [`animal-${id}`] } },
  });
  return res;
};
