import { Avatar } from '../components/Avatar';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Avatar />
        <div className="header-text">
          <h2 className="header-title">John Doe</h2>
          <p className="header-subtitle">Online</p>
        </div>
      </div>
    </header>
  );
};
