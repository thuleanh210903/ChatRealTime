// components/Header.tsx
import type React from 'react';
import { Avatar } from '../components/Avatar';
import type { ChatTarget } from '../../types/ChatTarget';

interface IHeader {
  target?: ChatTarget | null;
}

export const Header: React.FC<IHeader> = ({ target }) => {
  const isGroup = target?.isGroup === true;

  return (
    <header className="header">
      <div className="container">
        <Avatar className="avatar-xl" avatarUrl={target?.avatarUrl} />
        <div className="header-text">
          <h2 className="header-title">
            {isGroup ? target?.name : target?.fullName}
          </h2>
          <p className="header-subtitle">{isGroup ? 'Group Chat' : 'Online'}</p>
        </div>
      </div>
    </header>
  );
};
