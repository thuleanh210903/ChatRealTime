import type React from 'react';
import { Avatar } from './Avatar';
import type { ChatMessage } from '../model/ChatMessage';

interface IChatDetail {
  message: ChatMessage;
  isOwn: boolean;
  otherUserAvatar?: string;
}
export const ChatDetail: React.FC<IChatDetail> = ({
  message,
  isOwn,
  otherUserAvatar,
}) => {
  const isImageFile = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  return (
    <div className={`chat-detail ${isOwn ? 'chat-send' : ''}`}>
      {!isOwn && <Avatar avatarUrl={otherUserAvatar} />}
      <div className="chat-message">
        {message.type === 'text' && <span>{message.text}</span>}

        {message.type === 'file' && message.fileUrl && (
          <>
            {isImageFile(message.fileUrl) ? (
              <img
                src={message.fileUrl}
                alt={message.fileName}
                className="chat-image"
                style={{ maxWidth: '200px', borderRadius: '8px' }}
              />
            ) : (
              <a
                href={message.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-file-link"
              >
                📎 {message.fileName}
              </a>
            )}
          </>
        )}
        <div className="chat-info">
          <p className="chat-time">
            {message.timestamp
              ? message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
          </p>
          <p className="chat-status">{message.isSeen ? 'Seen' : ''}</p>
        </div>
      </div>
    </div>
  );
};
