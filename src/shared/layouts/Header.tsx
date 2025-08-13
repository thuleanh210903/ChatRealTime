import type React from 'react';
import { Avatar } from '../components/Avatar';
import type { User } from '../model/User';

interface IHeader {
  user?: User | null;
}
export const Header: React.FC<IHeader> = ({ user }) => {
  return (
    <header className="header">
      <div className="container">
        <Avatar className="avatar-xl" avatarUrl={user?.avatarUrl} />
        <div className="header-text">
          <h2 className="header-title">{user?.fullName}</h2>
          <p className="header-subtitle">Online</p>
        </div>
      </div>
    </header>
  );
};
