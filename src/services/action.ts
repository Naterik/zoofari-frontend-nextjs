"use server";
import { signIn } from "@/auth/auth";

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    if (r?.error) {
      if (r.error.includes("Tài khoản chưa kích hoạt")) {
        return { error: r.error, code: 2 };
      }
      return { error: r.error, code: 1 };
    }
    return { success: true };
  } catch (error) {
    if ((error as any).name === "InvalidEmailPasswordError") {
      return { error: "Invalid credentials", code: 1 };
    } else if ((error as any).name === "InactiveAccountError") {
      return { error: "Inactive account", code: 2 };
    } else {
      return {
        error: (error as any).message || "Internal server error",
        code: 0,
      };
    }
  }
}
