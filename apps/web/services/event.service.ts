import { api } from "../lib/axios";

export interface GetEventsParams {
  page: number;
  limit: number;
  search: string;
  type: string;
}

export const createEventService = async (formData: FormData) => {
  const response = await api.post("/events", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getEventsService = async (params: GetEventsParams) => {
  const response = await api.get("/events", { params });
  return response.data;
};

export const deleteEventService = async (id: string) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

export const getEventByIdService = async (id: string) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const updateEventService = async (id: string, formData: FormData) => {
  const response = await api.put(`/events/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
