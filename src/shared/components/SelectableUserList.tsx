import { useEffect, useMemo, useState } from 'react';
import type { User } from '../model/User';
import { useUser } from '../../context/UserProvider';
import { getAllUserExceptCurrent } from '../../services/user.service';
import { Avatar } from './Avatar';

interface ISelectableUserList {
  searchKey?: string;
  selectedIds: string[];
  onToggleSelect: (uid: string) => void;
}

export const SelectableUserList: React.FC<ISelectableUserList> = ({
  searchKey,
  selectedIds,
  onToggleSelect,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const { user: currentUser } = useUser();

  useEffect(() => {
    if (!currentUser?.uid) return;
    const fetchUsers = async () => {
      const userList = await getAllUserExceptCurrent(currentUser.uid);
      setUsers(userList);
    };
    fetchUsers();
  }, [currentUser?.uid]);

  const filteredUsers = useMemo(() => {
    if (!searchKey?.trim()) return users;
    return users.filter((user) =>
      user.fullName.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [users, searchKey]);

  return (
    <ul className="selectable-user-list">
      {filteredUsers.map((u) => (
        <li
          key={u.uid}
          className={`selectable-user-item ${
            selectedIds.includes(u.uid) ? 'selected' : ''
          }`}
          onClick={() => onToggleSelect(u.uid)}
        >
          <Avatar avatarUrl={u.avatarUrl} status={u.isOnline} />
          <span className="user-name">{u.fullName}</span>
          <input
            type="checkbox"
            checked={selectedIds.includes(u.uid)}
            readOnly
          />
        </li>
      ))}
    </ul>
  );
};
