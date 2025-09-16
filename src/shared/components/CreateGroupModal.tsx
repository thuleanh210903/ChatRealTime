import { useState } from 'react';
import { useUser } from '../../context/UserProvider';
import { SearchBar } from './SearchBar';
import { UploadImage } from './UploadImage';
import { SelectableUserList } from './SelectableUserList';
import { uploadImage } from '../../services/image.service';
import { createGroupConversation } from '../../services/group.service';

interface ICreateGroupModal {
  onClose: () => void;
}

export const CreateGroupModal: React.FC<ICreateGroupModal> = ({ onClose }) => {
  const [groupImage, setGroupImage] = useState<File | null>(null);
  const [groupName, setGroupName] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { user: currentUser } = useUser();

  const handleToggleSelect = (uid: string) => {
    setSelectedUsers((prev) =>
      prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
    );
  };

  const handleCreateGroup = async () => {
    if (!currentUser) return;

    let avatarUrl = '';
    if (groupImage) {
      avatarUrl = await uploadImage(groupImage);
    }

    await createGroupConversation(
      currentUser.uid,
      groupName,
      selectedUsers,
      avatarUrl
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Group Chat</h2>
        <UploadImage
          defaultImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz5mDg6HE84WsyjscmLeJK7EibtmChgbvKbA&s"
          onChange={(file) => setGroupImage(file)}
        />
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <SearchBar
          onChange={(value: string) => setSearchKey(value)}
          value={searchKey}
        />

        <SelectableUserList
          searchKey={searchKey}
          selectedIds={selectedUsers}
          onToggleSelect={handleToggleSelect}
        />

        <div className="modal-actions">
          <button onClick={handleCreateGroup}>Create</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
