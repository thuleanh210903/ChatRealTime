import { Avatar } from '../components/Avatar';
import { ListUser } from '../components/ListUser';
import { SearchBar } from '../components/SearchBar';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Message</h1>
        <Avatar />
      </div>
      <div className="sidebar-util">
        <SearchBar />
      </div>
      <ListUser />
    </aside>
  );
};
