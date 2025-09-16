import type React from 'react';
import type { Conversation } from '../model/Conversation';
import { Avatar } from './Avatar';

interface IGroupCard {
  group: Conversation;
}

export const GroupCard: React.FC<IGroupCard> = ({ group }) => {
  return (
    <div className="card">
      <div className="card-left">
        <div className="card-image avatar">
          <Avatar avatarUrl={group.avatarUrl} />
        </div>
        <div className="card-content">
          <h2 className="card-title">{group.name}</h2>
          <p className="card-desc"></p>
        </div>
      </div>
      <div className="card-right">
        <p className="card-subtitle"></p>
        <img className="card-icon" />
      </div>
    </div>
  );
};
