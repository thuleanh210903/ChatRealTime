import { UserCard } from './UserCard';

export const ListUser = () => {
  return (
    <ul className="list-users">
      <li className="list-item">
        <UserCard />
      </li>
      <li className="list-item">
        <UserCard />
      </li>
      <li className="list-item">
        <UserCard />
      </li>
      <li className="list-item">
        <UserCard />
      </li>
    </ul>
  );
};
