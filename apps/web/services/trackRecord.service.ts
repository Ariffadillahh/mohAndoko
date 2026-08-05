import { api } from "../lib/axios";

export interface GetTrackRecordsParams {
  page: number;
  limit: number;
  search: string;
}

export const getTrackRecordsService = async (params: GetTrackRecordsParams) => {
  const response = await api.get("/track-records", { params });
  return response.data;
};

export const createTrackRecordService = async (data: FormData) => {
  const response = await api.post("/track-records", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateTrackRecordService = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await api.put(`/track-records/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteTrackRecordService = async (id: string) => {
  const response = await api.delete(`/track-records/${id}`);
  return response.data;
};
