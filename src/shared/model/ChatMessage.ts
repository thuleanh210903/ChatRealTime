import type { User } from './User';

export interface ChatMessage {
  id?: string;
  senderId: string;
  receiverId?: string;
  conversationId?: string;
  text?: string;
  type: 'text' | 'file';
  fileUrl?: string;
  fileName?: string;
  isSeen: boolean;
  timestamp: Date | null;
  sender?: User;
}
