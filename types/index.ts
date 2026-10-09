export type UserRole = 'teller' | 'learner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  university?: string;
  joinedAt: string;
}

export interface TellerChannel {
  id: string;
  userId: string;
  name: string;
  handle: string;
  avatar: string;
  bannerColor?: string;
  bio: string;
  university: string;
  subjects: string[];
  followerCount: number;
  totalViews: number;
  resourceCount: number;
}

export type ResourceType = 'pdf' | 'video';

export interface Resource {
  id: string;
  channelId: string;
  tellerId: string;
  tellerName: string;
  tellerAvatar: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  type: ResourceType;
  fileUrl?: string;
  fileName: string;
  fileSize: string;
  thumbnailUrl?: string;
  views: number;
  favouritesCount: number;
  duration?: string; // For videos (e.g. "18:40")
  pageCount?: number; // For PDFs (e.g. 34 pages)
  contentPreview?: string; // Structured notes content for PDF viewer
  videoUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SavedResource {
  id: string;
  userId: string;
  resourceId: string;
  savedAt: string;
}

export interface FavouriteTeller {
  id: string;
  userId: string;
  channelId: string;
  favouritedAt: string;
}

export interface ViewingHistory {
  id: string;
  userId: string;
  resourceId: string;
  viewedAt: string;
}

export type ActiveView = 
  | 'home' 
  | 'explore' 
  | 'subjects' 
  | 'teller-dashboard' 
  | 'learner-dashboard' 
  | 'resource-detail' 
  | 'channel-detail' 
  | 'auth' 
  | 'about';
