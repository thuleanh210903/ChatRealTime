import React, { useState } from 'react';
import { updateGroupInfo } from '../../services/group.service';
import { UploadImage } from '../components/UploadImage';

interface IUpdateGroupModal {
  conversationId: string;
  currentName: string;
  currentAvatar?: string;
  onClose: () => void;
}

export const UpdateGroupModal: React.FC<IUpdateGroupModal> = ({
  conversationId,
  currentName,
  currentAvatar,
  onClose,
}) => {
  const [groupName, setGroupName] = useState(currentName);
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateGroupInfo(conversationId, groupName, avatarFile);
    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      alert('Update failed!');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>✏️ Update Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Group Avatar</label>
            <UploadImage
              defaultImage={currentAvatar}
              onChange={(file) => setAvatarFile(file)}
            />
          </div>

          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
