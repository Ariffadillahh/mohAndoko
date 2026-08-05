import { PublishStatus } from "@prisma/client";

export interface CreateBlogDTO {
  title: string;
  category: string;
  contentHtml: string;
  status: PublishStatus;
  thumbnailUrl?: string;
  authorId: string;
}

export interface UpdateBlogDTO {
  title?: string;
  category?: string;
  contentHtml?: string;
  status?: any; 
  thumbnailUrl?: string;
  removeThumbnail?: string;
  uploadedImagesTracker?: string;
}
