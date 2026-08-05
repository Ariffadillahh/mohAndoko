import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createBlogService,
  deleteBlogService,
  getBlogByIdService,
  GetBlogsParams,
  getBlogsService,
  updateBlogService,
} from "../services/blog.service";
import { customToast } from "../lib/toast";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => createBlogService(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      customToast.success("Artikel blog berhasil diterbitkan!");
      router.push("/dashboard/blog");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.message ||
        "Terjadi kesalahan saat menyimpan artikel.";
      customToast.error(msg);
    },
  });
};

export const useGetBlogs = (params: GetBlogsParams) => {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => getBlogsService(params),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlogService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      customToast.success("Artikel berhasil dihapus!");
    },
    onError: (error: any) => {
      customToast.error(
        error.response?.data?.message || "Gagal menghapus artikel.",
      );
    },
  });
};

export const useGetBlogById = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogByIdService(id),
    enabled: !!id, 
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlogService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      customToast.success("Artikel berhasil diperbarui!"); 
    },
    onError: (error: any) => {
      customToast.error(error.response?.data?.message || "Gagal memperbarui artikel.");
    },
  });
};
