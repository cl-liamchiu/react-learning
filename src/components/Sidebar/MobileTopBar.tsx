import React from 'react';

interface MobileTopBarProps {
  onMenuClick: () => void;
  isDrawerOpen: boolean;
  setHamburgerRef?: (el: HTMLButtonElement | null) => void;
}

const MobileTopBar: React.FC<MobileTopBarProps> = ({
  onMenuClick,
  isDrawerOpen,
  setHamburgerRef,
}) => {
  return (
    <header className="mobile-topbar">
      <span style={{ fontWeight: 600, fontSize: '1.2rem', color: '#fff' }}>
        React Learning
      </span>
      <button
        aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
        aria-controls="sidebar-drawer"
        aria-expanded={isDrawerOpen}
        className="hamburger-btn"
        onClick={onMenuClick}
        ref={setHamburgerRef}
      >
        <span aria-hidden="true">{isDrawerOpen ? '✕' : '☰'}</span>
      </button>
    </header>
  );
};

export default MobileTopBar;
