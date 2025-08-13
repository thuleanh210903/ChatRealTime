import React, { useEffect, useMemo, useState } from 'react';
import { UserCard } from './UserCard';
import type { User } from '../model/User';
import { getAllUserExceptCurrent } from '../../services/user.service';
import { useUser } from '../../context/UserProvider';

interface IListUser {
  searchKey?: string;
}

export const ListUser: React.FC<IListUser> = ({ searchKey }) => {
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
      {filteredUsers?.map((user) => (
        <li className="list-item" key={user?.uid}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
};
