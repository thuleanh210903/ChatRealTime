import { Header } from '../../layouts/Header';
import { Sidebar } from '../../layouts/Sidebar';

const Home = () => {
  return (
    <div className="page page-home">
      <Sidebar />
      <div className="">
        <Header />
        <main></main>
      </div>
    </div>
  );
};

export default Home;
