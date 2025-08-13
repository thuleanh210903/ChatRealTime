import { Chat } from '../../components/Chat';
import { ChatDetail } from '../../components/ChatDetail';

const Home = () => {
  return (
    <div className="container">
      <div className="chat-frame">
        <ChatDetail />
        <ChatDetail className="chat-send" />
        <ChatDetail />
        <ChatDetail className="chat-send" />
        <ChatDetail />
        <ChatDetail className="chat-send" />
        <ChatDetail className="chat-send" />
      </div>
      <Chat />
    </div>
  );
};

export default Home;
