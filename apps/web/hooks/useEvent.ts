import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createEventService,
  deleteEventService,
  getEventByIdService,
  GetEventsParams,
  getEventsService,
  updateEventService,
} from "../services/event.service";
import { customToast } from "../lib/toast";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => createEventService(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });

      customToast.success("Event baru berhasil ditambahkan!");
      router.push("/dashboard/events");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat menyimpan event.";
      customToast.error(errorMessage);
    },
  });
};

export const useGetEvents = (params: GetEventsParams) => {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => getEventsService(params),
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEventService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      customToast.success("Event berhasil dihapus!");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Gagal menghapus event.";
      customToast.error(msg);
    },
  });
};

export const useGetEventById = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventByIdService(id),
    enabled: !!id, 
  });
};

export const useUpdateEvent = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => updateEventService(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });

      customToast.success("Event berhasil diperbarui!");
      router.push("/dashboard/events");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.message ||
        "Terjadi kesalahan saat memperbarui event.";
      customToast.error(msg);
    },
  });
};
