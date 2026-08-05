import { EventType, PublishStatus } from '@prisma/client';

export interface CreateEventDTO {
  title: string;
  slug?: string; 
  type?: EventType;
  thumbnailUrl?: string;
  eventDate: Date | string;
  eventTime: string;
  location: string;
  groupLink?: string;
  price?: number;
  description: string;
  status?: PublishStatus;
  benefits?: any;
  resources?: any;
  authorId: string;
}

export type UpdateEventDTO = Partial<CreateEventDTO>;