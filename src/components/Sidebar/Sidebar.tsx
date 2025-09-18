import React from 'react';

import './Sidebar.css';

interface SidebarProps {
  pages: { key: string; label: string }[];
  activePage: string;
  setActivePage: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ pages, activePage, setActivePage }) => (
  <aside className="sidebar">
    {pages.map(page => (
      <button
        key={page.key}
        onClick={() => setActivePage(page.key)}
        className={`sidebar-btn${activePage === page.key ? ' active' : ''}`}
      >
        {page.label}
      </button>
    ))}
  </aside>
);

export default Sidebar;
