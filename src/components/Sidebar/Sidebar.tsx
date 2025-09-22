import React from 'react';
import { NavLink } from 'react-router';

import './Sidebar.css';

interface SidebarProps {
  pages: { key: string; label: string }[];
  activePage: string;
  setActivePage: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  pages,
  activePage,
  setActivePage,
}) => (
  <aside className="sidebar">
    {pages.map((page) => (
      <button
        key={page.key}
        onClick={() => setActivePage(page.key)}
        className={`sidebar-btn${activePage === page.key ? ' active' : ''}`}
      >
        {page.label}
      </button>
    ))}
    <NavLink
      to="/route-mode/route-info"
      className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}
    >
      Switch to Router
    </NavLink>
  </aside>
);

export default Sidebar;
