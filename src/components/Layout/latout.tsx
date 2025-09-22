import { Outlet } from 'react-router';

import SidebarWithRoute from '../Sidebar/SidebarWithRoute';

const Layout: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarWithRoute />
      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
