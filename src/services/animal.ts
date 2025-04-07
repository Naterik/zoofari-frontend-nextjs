"use server";

import { auth } from "@/auth/auth";
import { revalidateTag } from "next/cache";
import { sendRequest } from "../utils/api";

export const handleCreateAnimalAction = async (data: Partial<IAnimals>) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IAnimals>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/animals`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-animals");
  return res;
};

export const handleUpdateAnimalAction = async (
  id: number,
  data: Partial<IAnimals>
) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IAnimals>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/animals/${id}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-animals");
  return res;
};

export const handleDeleteAnimalAction = async (id: number) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IAnimals>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/animals/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  revalidateTag("list-animals");
  return res;
};
