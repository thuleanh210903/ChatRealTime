import { useState } from 'react';
import { useUser } from '../../context/UserProvider';
import { logout } from '../../services/auth.service';

interface IAvatar {
  className?: string;
  avatarUrl?: string | '';
  status?: boolean;
}

export const Avatar: React.FC<IAvatar> = ({ className, avatarUrl, status }) => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    if (!user) return;

    await logout(user.uid);
    setUser(null);
  };

  return (
    <div
      className={`avatar ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <img className="avatar-image" alt="avatar" src={avatarUrl} />
      {status && <div className="avatar-status"></div>}

      {open && (
        <div className="dropdown">
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
