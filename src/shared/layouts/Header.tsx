import React, { useState } from 'react';
import { Avatar } from '../components/Avatar';
import type { ChatTarget } from '../../types/ChatTarget';
import { useUser } from '../../context/UserProvider';
import { leaveGroup } from '../../services/group.service';
import { UpdateGroupModal } from '../components/UpdateGroupModal';
import { ListUsersModal } from '../components/ListUsersModal';

interface IHeader {
  target?: ChatTarget | null;
}

export const Header: React.FC<IHeader> = ({ target }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { user } = useUser();

  const isGroup = target?.isGroup === true;

  const handleMenuAction = async (action: string) => {
    setMenuOpen(false);

    if (!target) return;

    switch (action) {
      case 'list':
        if ('id' in target) {
          setShowListModal(true);
        }
        break;

      case 'out':
        if ('id' in target && user?.uid) {
          await leaveGroup(target.id, user.uid);
          console.log('You have left the group');
        }
        break;

      case 'update':
        if ('id' in target) {
          setShowUpdateModal(true);
        }
        break;
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <Avatar className="avatar-xl" avatarUrl={target?.avatarUrl} />
          <div>
            <h2 className="header-title">
              {isGroup ? target?.name : target?.fullName}
            </h2>
            <p className="header-subtitle">
              {isGroup ? 'Group Chat' : 'Online'}
            </p>
          </div>
        </div>

        {isGroup && (
          <div className="header-menu">
            <button
              className="header-menu-btn"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              …
            </button>

            {menuOpen && (
              <div className="header-menu-dropdown">
                <button onClick={() => handleMenuAction('list')}>
                  👥 List users
                </button>
                <button onClick={() => handleMenuAction('out')}>
                  🚪 Out of group
                </button>
                <button onClick={() => handleMenuAction('update')}>
                  ✏️ Update group info
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Modal danh sách user */}
      {showListModal && target && 'id' in target && (
        <ListUsersModal
          conversationId={target.id}
          onClose={() => setShowListModal(false)}
        />
      )}

      {/* Modal update group */}
      {showUpdateModal && target && 'id' in target && (
        <UpdateGroupModal
          conversationId={target.id}
          onClose={() => setShowUpdateModal(false)}
          currentName={''}
        />
      )}
    </>
  );
};
