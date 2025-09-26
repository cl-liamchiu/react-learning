import { useState, useEffect } from 'react';
import './App.css';
import ReactInfo from './components/ReactIntroPage/ReactInfo';
import ComponentInfo from './components/ComponentPage/ComponentInfo';
import Sidebar from './components/Sidebar/Sidebar';
import MobileTopBar from './components/Sidebar/MobileTopBar';
import { useMobileSidebar } from './components/Sidebar/useMobileSidebar';
import Homework1 from './components/Homework1/Homework1';
import Homework2 from './components/Homework2/Homework2';
import HooksIntro from './components/HooksIntro/HooksIntro';

function App() {
  const [activePage, setActivePage] = useState('reactInfo');
  const pages = [
    { key: 'reactInfo', label: 'React 簡介' },
    { key: 'component', label: 'Component 介紹' },
    { key: 'hooks', label: 'Hooks' },
    { key: 'hw1', label: 'Homework 1' },
    { key: 'hw2', label: 'Homework 2' },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const { drawerOpen, setDrawerOpen, isMobile } = useMobileSidebar();

  return (
    <>
      {isMobile ? (
        <>
          <MobileTopBar
            onMenuClick={() => setDrawerOpen(true)}
            isDrawerOpen={drawerOpen}
          />
          {drawerOpen && (
            <>
              <div
                className="sidebar-drawer-backdrop"
                onClick={() => {
                  setDrawerOpen(false);
                }}
                aria-hidden="true"
              />
              <div
                className="sidebar-drawer"
                id="sidebar-drawer"
                role="dialog"
                aria-modal="true"
              >
                <button
                  aria-label="Close menu"
                  onClick={() => {
                    setDrawerOpen(false);
                  }}
                >
                  ✕
                </button>
                <Sidebar
                  pages={pages}
                  activePage={activePage}
                  setActivePage={setActivePage}
                  onNavigate={() => setDrawerOpen(false)}
                />
              </div>
            </>
          )}
          <main style={{ flex: 1, padding: '1rem', minWidth: 0 }}>
            {activePage === 'reactInfo' && <ReactInfo />}
            {activePage === 'component' && <ComponentInfo />}
            {activePage === 'hooks' && <HooksIntro />}
            {activePage === 'hw1' && <Homework1 />}
            {activePage === 'hw2' && <Homework2 />}
          </main>
        </>
      ) : (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar
            pages={pages}
            activePage={activePage}
            setActivePage={setActivePage}
          />
          <main style={{ flex: 1, padding: '2rem', minWidth: 0 }}>
            {activePage === 'reactInfo' && <ReactInfo />}
            {activePage === 'component' && <ComponentInfo />}
            {activePage === 'hooks' && <HooksIntro />}
            {activePage === 'hw1' && <Homework1 />}
            {activePage === 'hw2' && <Homework2 />}
          </main>
        </div>
      )}
    </>
  );
}

export default App;
