import sendIcon from '../../../public/send.svg';
import linkIcon from '../../../public/link.svg';
import stickerIcon from '../../../public/emoji.svg';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useReducer, useRef, useState } from 'react';
import type { ChatMessage } from '../model/ChatMessage';
import { useUser } from '../../context/UserProvider';
import {
  getConversationId,
  listenMessages,
  sendMessage,
} from '../../services/chat.service';
import type { User } from '../model/User';
import { uploadImage } from '../../services/image.service';

interface ChatProps {
  selectedUser: User | null;
  onMessagesUpdate: (msgs: ChatMessage[]) => void;
}

export const Chat = ({ selectedUser, onMessagesUpdate }: ChatProps) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  console.log('uid', selectedUser?.uid);

  useEffect(() => {
    if (!user?.uid || !selectedUser?.uid) return;

    const conversationId = getConversationId(user.uid, selectedUser.uid);
    const unsub = listenMessages(conversationId, onMessagesUpdate);

    return () => unsub();
  }, [user?.uid, selectedUser]);

  const handleSendText = async () => {
    if (!message.trim() || !user?.uid || !selectedUser?.uid) return;

    const conversationId = getConversationId(user.uid, selectedUser.uid);

    await sendMessage(conversationId, {
      senderId: user.uid,
      receiverId: selectedUser.uid,
      text: message,
      type: 'text',
      fileName: '',
      fileUrl: '',
    });
    setMessage('');
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!user?.uid || !selectedUser?.uid) return;

    const file = e.target.files[0];
    const fileName = file.name;

    try {
      const fileUrl = await uploadImage(file);

      const conversationId = getConversationId(user.uid, selectedUser.uid);

      await sendMessage(conversationId, {
        senderId: user.uid,
        receiverId: selectedUser.uid,
        text: '',
        type: 'file',
        fileName,
        fileUrl,
      });
    } catch (err) {
      console.error('File upload/send error:', err);
    }

    e.target.value = '';
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
        <img
          src={linkIcon}
          className="icon"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
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
        <img
          src={sendIcon}
          className="icon icon-action"
          onClick={handleSendText}
        />
      </div>
    </div>
  );
};
