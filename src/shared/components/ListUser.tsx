import { useEffect, useState } from 'react';
import { UserCard } from './UserCard';
import type { User } from '../model/User';
import { getAllUserExceptCurrent } from '../../services/user.service';
import { useUser } from '../../context/UserProvider';

export const ListUser = () => {
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
  return (
    <ul className="list-users">
      {users?.map((user) => (
        <li className="list-item">
          <UserCard key={user?.uid} user={user} />
        </li>
      ))}
    </ul>
  );
};
