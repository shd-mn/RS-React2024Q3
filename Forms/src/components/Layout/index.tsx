import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Bg from '../Bg';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Bg />
    </>
  );
}

export default Layout;
