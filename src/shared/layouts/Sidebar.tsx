import { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { ListUser } from '../components/ListUser';
import { SearchBar } from '../components/SearchBar';
import type { User } from '../model/User';

export const Sidebar = ({
  onUserSelect,
}: {
  onUserSelect: (user: User) => void;
}) => {
  const [keySearch, setKeySearch] = useState('');

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Message</h1>
        <Avatar />
      </div>
      <div className="sidebar-util">
        <SearchBar value={keySearch} onChange={setKeySearch} />
      </div>
      <ListUser searchKey={keySearch} onSelect={onUserSelect} />
    </aside>
  );
};
