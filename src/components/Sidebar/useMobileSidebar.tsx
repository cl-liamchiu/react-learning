import { useState, useEffect } from 'react';

export function useMobileSidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [drawerOpen]);

  // Responsive: show mobile topbar and drawer on small screens
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 700px)').matches;

  return {
    drawerOpen,
    setDrawerOpen,
    isMobile,
  };
}
