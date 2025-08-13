import type React from 'react';
import type { User } from '../model/User';
import { Avatar } from './Avatar';

interface IUserCard {
  user: User;
}

export const UserCard: React.FC<IUserCard> = ({ user }) => {
  return (
    <div className="card">
      <div className="card-left">
        <div className="card-image avatar">
          <Avatar avatarUrl={user.avatarUrl} status={user.isOnline} />
        </div>
        <div className="card-content">
          <h2 className="card-title">{user.fullName}</h2>
          <p className="card-desc">How are you doing ?</p>
        </div>
      </div>
      <div className="card-right">
        <p className="card-subtitle">16:45</p>
        <img className="card-icon" />
      </div>
    </div>
  );
};
