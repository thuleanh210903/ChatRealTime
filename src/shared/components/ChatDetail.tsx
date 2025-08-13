import type React from 'react';
import { Avatar } from './Avatar';

interface IChatDetail {
  className?: string | '';
}
export const ChatDetail: React.FC<IChatDetail> = ({ className }) => {
  return (
    <div className={`chat-detail ${className}`}>
      <Avatar />
      <div className="chat-message">
        Hello, Have you seen my backpack anywhere in office, see you at office
        tomorrow !
        <div className="chat-info">
          <p className="chat-time">6:35</p>
          <p className="chat-status">Seen</p>
        </div>
      </div>
    </div>
  );
};
