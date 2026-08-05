export interface CreateTrackRecordDTO {
  programName: string;
  companyName: string;
  location: string;
  thumbnailUrl?: string;
  authorId: string;
}

export interface UpdateTrackRecordDTO {
  programName?: string;
  companyName?: string;
  location?: string;
  thumbnailUrl?: string;
}
