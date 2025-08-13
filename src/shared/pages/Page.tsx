import { Outlet } from 'react-router-dom';
import { Header } from '../layouts/Header';
import { Sidebar } from '../layouts/Sidebar';

const Page = () => {
  return (
    <div className="page page-home">
      <Sidebar />
      <div className="wrapper">
        <Header />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Page;
