import { useEffect, useState } from 'react';
import { Avatar } from '../components/Avatar';
import { ListUser } from '../components/ListUser';
import { SearchBar } from '../components/SearchBar';
import type { User } from '../model/User';
import { useUser } from '../../context/UserProvider';
import { FiUsers } from 'react-icons/fi';
import { CreateGroupModal } from '../components/CreateGroupModal';
import { listenUserConversations } from '../../services/chat.service';
import type { Conversation } from '../model/Conversation';
import { GroupCard } from '../components/GroupCard';

type ChatTarget = User | (Conversation & { isGroup: true });

export const Sidebar = ({
  onTargetSelect,
}: {
  onTargetSelect: (target: ChatTarget) => void;
}) => {
  const [keySearch, setKeySearch] = useState('');
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsub = listenUserConversations(user.uid, setConversations);
    return () => unsub();
  }, [user]);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Message</h1>
        <div className="sidebar-action">
          <button
            className="btn-create-group"
            onClick={() => setIsModalOpen(true)}
          >
            <FiUsers size={24} />
          </button>
          <Avatar avatarUrl={user?.avatarUrl} isCurrentUser />
        </div>
      </div>
      <div className="sidebar-util">
        <SearchBar value={keySearch} onChange={setKeySearch} />
      </div>
      <h3>User Chat</h3>
      <ListUser searchKey={keySearch} onSelect={onTargetSelect} />

      <h3>Group Chat</h3>
      <ul className="list-group">
        {conversations
          .filter((c) => c.isGroup)
          .map((group) => (
            <li
              key={group.id}
              className="list-item"
              onClick={() =>
                onTargetSelect({
                  id: group.id,
                  name: group.name,
                  avatarUrl: group.avatarUrl,
                  isGroup: true,
                } as any)
              }
            >
              <GroupCard group={group} />
            </li>
          ))}
      </ul>
      {isModalOpen && (
        <CreateGroupModal onClose={() => setIsModalOpen(false)} />
      )}
    </aside>
  );
};
