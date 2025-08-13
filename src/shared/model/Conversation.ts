export interface Conversation {
  id: string; 
  participants: string[]; 
  lastMessage?: string;
  lastMessageTime?: Date;
}