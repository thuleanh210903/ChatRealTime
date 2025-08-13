import { Outlet } from 'react-router-dom';
import { Header } from '../layouts/Header';
import { Sidebar } from '../layouts/Sidebar';
import { useState } from 'react';
import type { User } from '../model/User';

const Page = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <div className="page page-home">
      <Sidebar onUserSelect={setSelectedUser} />
      <div className="wrapper">
        <Header user={selectedUser} />
        <main className="main">
          <Outlet context={{ selectedUser }} />
        </main>
      </div>
    </div>
  );
};

export default Page;
