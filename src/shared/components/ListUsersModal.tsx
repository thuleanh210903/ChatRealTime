import React, { useEffect, useState } from 'react';
import {
  getGroupMembers,
  fetchUserInfo,
  type UserData,
} from '../../services/group.service';
import { Avatar } from './Avatar';

interface ListUsersModalProps {
  conversationId: string;
  onClose: () => void;
}

export const ListUsersModal: React.FC<ListUsersModalProps> = ({
  conversationId,
  onClose,
}) => {
  const [members, setMembers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await getGroupMembers(conversationId);
      if (res.success) {
        const userInfos = await Promise.all(
          res.members.map((uid: string) => fetchUserInfo(uid))
        );
        setMembers(userInfos);
      }
      setLoading(false);
    };
    fetchMembers();
  }, [conversationId]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>👥 Group Members</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="selectable-user-list">
            {members.map((m) => (
              <li key={m.uid} className="selectable-user-item">
                <Avatar avatarUrl={m.avatarUrl} className="user-avater" />
                {/* <img
                  src={m.avatarUrl}
                  alt={m.fullName}
                  className="user-avatar"
                /> */}
                <span className="user-name">{m.fullName}</span>
                <input type="checkbox" checked readOnly />
              </li>
            ))}
          </ul>
        )}
        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};
