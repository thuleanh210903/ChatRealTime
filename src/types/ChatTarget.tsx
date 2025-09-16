import type { Conversation } from '../shared/model/Conversation';
import type { User } from '../shared/model/User';

export type ChatTarget =
  | (User & { isGroup?: false })
  | (Conversation & { isGroup: true });
