import { Avatar } from '../components/Avatar';
import { SearchBar } from '../components/SearchBar';
import { UserCard } from '../components/UserCard';

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
      <ul className="list-users">
        <li className="list-item">
          <UserCard />
        </li>
      </ul>
    </aside>
  );
};
