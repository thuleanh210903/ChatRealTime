// Home.tsx
import { Chat } from '../../components/Chat';
import { ChatDetail } from '../../components/ChatDetail';
import { useState } from 'react';
import type { ChatMessage } from '../../model/ChatMessage';
import type { User } from '../../model/User';
import { useUser } from '../../../context/UserProvider';
import { useOutletContext } from 'react-router-dom';

interface OutletContextType {
  selectedUser: User | null;
}

const Home = () => {
  const { selectedUser } = useOutletContext<OutletContextType>();
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
            otherUserAvatar={selectedUser?.avatarUrl}
          />
        ))}
      </div>

      <Chat selectedUser={selectedUser} onMessagesUpdate={setMessages} />
    </div>
  );
};

export default Home;
