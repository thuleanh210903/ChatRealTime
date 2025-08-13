import type { User } from './User';

export interface ChatMessage {
  id?: string;
  senderId: string;
  receiverId: string;
  text?: string;
  type: string;
  fileUrl?: string;
  fileName?: string;
  isSeen: boolean;
  timestamp: Date | null;
  sender?: User;
}
