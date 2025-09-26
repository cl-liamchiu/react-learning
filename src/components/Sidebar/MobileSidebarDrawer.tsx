import React from 'react';
import SidebarWithRoute from './SidebarWithRoute';

interface MobileSidebarDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MobileSidebarDrawer: React.FC<MobileSidebarDrawerProps> = ({
  open,
  onClose,
}) => (
  <>
    {open && (
      <>
        <div
          className="sidebar-drawer-backdrop"
          onClick={() => {
            onClose();
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
              onClose();
            }}
          >
            ✕
          </button>
          <SidebarWithRoute onNavigate={onClose} />
        </div>
      </>
    )}
  </>
);

export default MobileSidebarDrawer;
