import { Outlet } from 'react-router-dom';
import { Header } from '../layouts/Header';
import { Sidebar } from '../layouts/Sidebar';
import { useState } from 'react';
import type { User } from '../model/User';
import type { Conversation } from '../model/Conversation';

const Page = () => {
  type ChatTarget = User | (Conversation & { isGroup: true });

  const [selectedTarget, setSelectedTarget] = useState<ChatTarget | null>(null);

  return (
    <div className="page page-home">
      <Sidebar onTargetSelect={setSelectedTarget} />
      <div className="wrapper">
        <Header target={selectedTarget} />
        <main className="main">
          <Outlet context={{ selectedTarget }} />
        </main>
      </div>
    </div>
  );
};

export default Page;
