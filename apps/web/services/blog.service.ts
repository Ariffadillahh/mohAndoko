import { api } from "../lib/axios";

export interface GetBlogsParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  status?: string;
}

export const createBlogService = async (formData: FormData) => {
  const response = await api.post("/blogs", formData);
  return response.data;
};


export const uploadBlogEditorImageService = async (file: File) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post("/blogs/upload-editor-image", formData);

  return response.data;
};

export const getBlogsService = async (params: GetBlogsParams) => {
  const response = await api.get("/blogs", { params });
  return response.data;
};

export const deleteBlogService = async (id: string) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

export const getBlogByIdService = async (id: string) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const updateBlogService = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await api.put(`/blogs/${id}`, data);
  return response.data;
};
