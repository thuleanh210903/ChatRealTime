import { useState } from 'react';
import { useUser } from '../../context/UserProvider';
import { logout } from '../../services/auth.service';
import { UpdateProfileModal } from './UpdateProfileModal';

interface IAvatar {
  className?: string;
  avatarUrl?: string | '';
  status?: boolean;
  isCurrentUser?: boolean;
}

export const Avatar: React.FC<IAvatar> = ({
  className,
  avatarUrl,
  status,
  isCurrentUser = false,
}) => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    if (!user) return;

    await logout(user.uid);
    setUser(null);
  };

  return (
    <div
      className={`avatar ${className}`}
      onMouseEnter={() => isCurrentUser && setOpen(true)}
      onMouseLeave={() => isCurrentUser && setOpen(false)}
    >
      <img className="avatar-image" alt="avatar" src={avatarUrl} />
      {status && <div className="avatar-status"></div>}

      {isCurrentUser && open && (
        <div className="dropdown">
          <button
            className="dropdown-item"
            onClick={() => setIsModalOpen(true)}
          >
            Update Profile
          </button>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {isModalOpen && (
        <UpdateProfileModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
