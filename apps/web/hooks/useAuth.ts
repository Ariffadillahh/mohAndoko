import { useMutation } from "@tanstack/react-query";
import {
  LoginPayload,
  loginUser,
  registerUser,
} from "../services/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import { customToast } from "../lib/toast";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => registerUser(formData),
    onSuccess: (data) => {
      customToast.success(
        "Registrasi berhasil! Mengalihkan ke halaman Sign In...",
      );

      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 1500);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Gagal mendaftar. Silakan coba lagi.";

      customToast.error(errorMessage);
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (response) => {
      customToast.success("Login berhasil! Selamat datang kembali.");

      const user = response.data?.user;
      const role = user?.role?.toUpperCase();
      const redirectParam = searchParams.get("redirect");

      let targetDestination = "/";

      if (redirectParam) {
        if (role === "USER" && redirectParam.startsWith("/dashboard")) {
          targetDestination = "/";
        } else {
          targetDestination = redirectParam;
        }
      } else {
        if (role === "ADMIN" || role === "SUPERADMIN") {
          targetDestination = "/dashboard";
        } else {
          targetDestination = "/";
        }
      }

      setTimeout(() => {
        window.location.href = targetDestination;
      }, 1000);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Login gagal. Periksa kembali email & password Anda.";
      customToast.error(errorMessage);
    },
  });
};
