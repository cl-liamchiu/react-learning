import { Outlet } from 'react-router';

import SidebarWithRoute from '../Sidebar/SidebarWithRoute';
import MobileTopBar from '../Sidebar/MobileTopBar';
import MobileSidebarDrawer from '../Sidebar/MobileSidebarDrawer';
import { useMobileSidebar } from '../Sidebar/useMobileSidebar';
import React from 'react';

const Layout: React.FC = () => {
  const { drawerOpen, setDrawerOpen, isMobile } = useMobileSidebar();
  return (
    <>
      {isMobile ? (
        <>
          <MobileTopBar
            onMenuClick={() => setDrawerOpen(true)}
            isDrawerOpen={drawerOpen}
          />
          <MobileSidebarDrawer
            open={drawerOpen}
            onClose={() => {
              setDrawerOpen(false);
            }}
          />
          <main style={{ flex: 1, padding: '1rem', minWidth: 0 }}>
            <Outlet />
          </main>
        </>
      ) : (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <SidebarWithRoute />
          <main style={{ flex: 1, padding: '2rem', minWidth: 0 }}>
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};

export default Layout;
