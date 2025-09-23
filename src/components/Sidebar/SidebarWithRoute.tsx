import React from 'react';
import { NavLink } from 'react-router';

import './Sidebar.css';

const SidebarWithRoute: React.FC = () => {
  const pages = [
    { key: 'react-info', label: 'React 簡介' },
    { key: 'component', label: 'Component 介紹' },
    { key: 'hooks', label: 'Hooks' },
    { key: 'hw/1', label: 'Homework 1' },
    { key: 'hw/2', label: 'Homework 2' },
    { key: 'route-info', label: 'Router 簡介' },
    { key: 'canva', label: 'Canva 簡介' },
  ];

  return (
    <aside className="sidebar">
      {pages.map((page) => (
        <NavLink
          key={page.key}
          to={`/route-mode/${page.key}`}
          className={({ isActive }) =>
            `sidebar-btn${isActive ? ' active' : ''}`
          }
        >
          {page.label}
        </NavLink>
      ))}
      <NavLink to="/" className="sidebar-btn">
        Switch to Non-Route
      </NavLink>
    </aside>
  );
};

export default SidebarWithRoute;
