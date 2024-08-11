import { ReactNode } from 'react';
import Header from '../Header';

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
