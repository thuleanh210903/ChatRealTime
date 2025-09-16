import type React from 'react';
import type { User } from '../model/User';
import { Avatar } from './Avatar';
import { useUser } from '../../context/UserProvider';
import {
  markConversationAsSeen,
  useLastMessage,
  useUnreadCount,
} from '../../services/chat.service';

interface IUserCard {
  user: User;
  conversationId: string;
}

export const UserCard: React.FC<IUserCard> = ({ user, conversationId }) => {
  const { user: currentUser } = useUser();

  const unreadCount = useUnreadCount(currentUser?.uid || '', user.uid);

  const lastMessage = useLastMessage(conversationId);

  return (
    <div
      className="card"
      onClick={async () => {
        try {
          await markConversationAsSeen(currentUser!.uid, conversationId);
        } catch (err) {
          console.error('Failed to mark as seen', err);
        }
      }}
    >
      <div className="card-left">
        <div className="card-image avatar">
          <Avatar avatarUrl={user.avatarUrl} status={user.isOnline} />
        </div>
        <div className="card-content">
          <h2 className="card-title">{user.fullName}</h2>
          <p className="card-desc">
            {lastMessage?.type === 'text'
              ? lastMessage.text
              : lastMessage?.fileName
              ? `📎 ${lastMessage.fileName}`
              : 'No message here'}
          </p>
        </div>
      </div>
      <div className="card-right">
        <p className="card-subtitle">
          {lastMessage?.timestamp
            ? lastMessage.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : ''}
        </p>
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        <img className="card-icon" />
      </div>
    </div>
  );
};
