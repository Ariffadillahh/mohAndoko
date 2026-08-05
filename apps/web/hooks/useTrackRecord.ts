import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTrackRecordsService,
  createTrackRecordService,
  updateTrackRecordService,
  deleteTrackRecordService,
  GetTrackRecordsParams,
} from "../services/trackRecord.service";
import { customToast } from "../lib/toast";

export const useGetTrackRecords = (params: GetTrackRecordsParams) => {
  return useQuery({
    queryKey: ["track-records", params],
    queryFn: () => getTrackRecordsService(params),
  });
};

export const useCreateTrackRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTrackRecordService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["track-records"] });
      customToast.success("Track Record berhasil ditambahkan!");
    },
    onError: (error: any) => {
      customToast.error(
        error.response?.data?.message || "Gagal menambahkan data.",
      );
    },
  });
};

export const useUpdateTrackRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTrackRecordService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["track-records"] });
      customToast.success("Track Record berhasil diperbarui!");
    },
    onError: (error: any) => {
      customToast.error(
        error.response?.data?.message || "Gagal memperbarui data.",
      );
    },
  });
};

export const useDeleteTrackRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTrackRecordService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["track-records"] });
      customToast.success("Track Record berhasil dihapus!");
    },
    onError: (error: any) => {
      customToast.error(
        error.response?.data?.message || "Gagal menghapus data.",
      );
    },
  });
};
