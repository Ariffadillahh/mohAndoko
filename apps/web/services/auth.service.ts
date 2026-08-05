import { api, setAccessToken } from "../lib/axios";
import { customToast } from "../lib/toast";

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const registerUser = async (formData: FormData) => {
  const response = await api.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);

  if (response.data.data?.accessToken) {
    setAccessToken(response.data.data.accessToken);
  }

  return response.data;
};

export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
    setAccessToken(null);
    customToast.success("Berhasil keluar");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    customToast.error("Gagal logout");
    throw error;
  }
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

