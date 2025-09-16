import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '../../context/UserProvider';
import { getAllUserExceptCurrent } from '../../services/user.service';
import type { User } from '../model/User';
import { UserCard } from './UserCard';
import { getConversationId } from '../../services/chat.service';

interface IListUser {
  searchKey?: string;
  onSelect: (user: User) => void;
}

export const ListUser: React.FC<IListUser> = ({ searchKey, onSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.uid) return;

    const fetchUsers = async () => {
      const userList = await getAllUserExceptCurrent(user?.uid);
      setUsers(userList);
    };

    fetchUsers();
  }, [user?.uid]);

  const filteredUsers = useMemo(() => {
    if (!searchKey?.trim()) return users;
    return users.filter((user) =>
      user.fullName.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [users, searchKey]);

  return (
    <ul className="list-users">
      {filteredUsers?.map(
        (u) =>
          user?.uid && (
            <li className="list-item" key={u?.uid} onClick={() => onSelect(u)}>
              <UserCard
                user={u}
                conversationId={getConversationId(user.uid, u.uid)}
              />
            </li>
          )
      )}
    </ul>
  );
};
