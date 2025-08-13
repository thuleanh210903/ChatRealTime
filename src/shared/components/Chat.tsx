import sendIcon from '../../../public/send.svg';
import linkIcon from '../../../public/link.svg';
import stickerIcon from '../../../public/emoji.svg';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

export const Chat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="chat">
      <input
        type="text"
        className="chat-input"
        placeholder="Type your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="chat-icon">
        <img src={linkIcon} className="icon" />
        <div className="icon-action" style={{ position: 'relative' }}>
          <img
            src={stickerIcon}
            className="icon"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="emoji-picker">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        <img src={sendIcon} className="icon icon-action" />
      </div>
    </div>
  );
};
