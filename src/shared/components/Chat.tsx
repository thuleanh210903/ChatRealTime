import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import stickerIcon from '../../../public/emoji.svg';
import linkIcon from '../../../public/link.svg';
import sendIcon from '../../../public/send.svg';
import { useUser } from '../../context/UserProvider';
import {
  getConversationId,
  listenMessages,
  sendMessage,
} from '../../services/chat.service';
import { uploadImage } from '../../services/image.service';
import type { ChatMessage } from '../model/ChatMessage';
import type { Conversation } from '../model/Conversation';
import type { User } from '../model/User';

type ChatTarget =
  | (User & { isGroup?: false })
  | (Conversation & { isGroup: true });

interface ChatProps {
  selectedTarget: ChatTarget | null;
  onMessagesUpdate: (msgs: ChatMessage[]) => void;
}

export const Chat = ({ selectedTarget, onMessagesUpdate }: ChatProps) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getTargetId = (target: ChatTarget) =>
    target.isGroup ? target.id : target.uid;

  const getConvId = (target: ChatTarget) =>
    target.isGroup ? target.id : getConversationId(user!.uid, target.uid);

  useEffect(() => {
    if (!user?.uid || !selectedTarget) return;
    const unsub = listenMessages(getConvId(selectedTarget), onMessagesUpdate);
    return () => unsub();
  }, [user?.uid, selectedTarget]);

  const sendChatMessage = async (
    type: 'text' | 'file',
    extra: Partial<ChatMessage> = {}
  ) => {
    if (!user?.uid || !selectedTarget) return;

    const baseMsg: Omit<ChatMessage, 'id' | 'timestamp'> = {
      senderId: user.uid,
      isSeen: false,
      type,
      text: '',
      fileName: '',
      fileUrl: '',
      ...(!selectedTarget.isGroup && {
        receiverId: getTargetId(selectedTarget),
      }),
      ...(selectedTarget.isGroup && {
        conversationId: getTargetId(selectedTarget),
      }),
      ...extra,
    };

    await sendMessage(getConvId(selectedTarget), baseMsg);
  };

  const handleSendText = async () => {
    if (!message.trim()) return;
    await sendChatMessage('text', { text: message });
    setMessage('');
  };

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const fileName = file.name;

    try {
      const fileUrl = await uploadImage(file);
      await sendChatMessage('file', { fileName, fileUrl });
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
