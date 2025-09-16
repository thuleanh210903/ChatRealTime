import { useState } from 'react';
import { useUser } from '../../context/UserProvider';
import { UploadImage } from './UploadImage';
import { updateUser } from '../../services/user.service';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
}

export const UpdateProfileModal: React.FC<Props> = ({ onClose }) => {
  const { user, setUser } = useUser();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const updatedUser = await updateUser(user.uid, {
        fullName,
        email,
        avatarFile,
      });

      setUser({ ...user, ...updatedUser });
      toast.success('Profile updated successfully ✅');
      onClose();
    } catch (err) {
      toast.error('Failed to update profile ❌');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update Profile</h2>
        <UploadImage
          defaultImage={user?.avatarUrl || ''}
          onChange={(file) => setAvatarFile(file)}
        />
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <div className="modal-actions">
          <button onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
