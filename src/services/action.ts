"use server";

import { auth, signIn } from "@/auth";
import { revalidateTag } from "next/cache";
import { sendRequest } from "../utils/api";

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: username,
      password: password,
      // callbackUrl: "/",
      redirect: false,
    });
    console.log(">>> check r: ", r);
    return r;
  } catch (error) {
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 1,
      };
    } else if ((error as any).name === "InactiveAccountError") {
      return {
        error: (error as any).type,
        code: 2,
      };
    } else {
      return {
        error: "Internal server error",
        code: 0,
      };
    }
  }
}

export const handleCreateUserAction = async (data: Partial<IUserModel>) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IUserModel>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-users");
  return res;
};

export const handleUpdateUserAction = async (
  id: string,
  data: Partial<IUserModel>
) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IUserModel>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    body: { ...data },
  });
  revalidateTag("list-users");
  return res;
};

export const handleDeleteUserAction = async (id: string) => {
  const session = await auth();
  const res = await sendRequest<IBackendRes<IUserModel>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });

  revalidateTag("list-users");
  return res;
};
