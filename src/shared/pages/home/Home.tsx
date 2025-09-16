// Home.tsx
import { Chat } from '../../components/Chat';
import { ChatDetail } from '../../components/ChatDetail';
import { useState } from 'react';
import type { ChatMessage } from '../../model/ChatMessage';
import type { User } from '../../model/User';
import { useUser } from '../../../context/UserProvider';
import { useOutletContext } from 'react-router-dom';
import type { Conversation } from '../../model/Conversation';

type ChatTarget = User | (Conversation & { isGroup: true });

interface OutletContextType {
  selectedTarget: ChatTarget | null;
}

const Home = () => {
  const { selectedTarget } = useOutletContext<OutletContextType>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { user } = useUser();

  return (
    <div className="container">
      <div className="chat-frame">
        {messages.map((msg) => (
          <ChatDetail
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === user?.uid}
            otherUserAvatar={selectedTarget?.avatarUrl}
          />
        ))}
      </div>

      <Chat selectedTarget={selectedTarget} onMessagesUpdate={setMessages} />
    </div>
  );
};

export default Home;
