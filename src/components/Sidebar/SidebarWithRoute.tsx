import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';

import './Sidebar.css';

const SidebarWithRoute: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isCanvasPage = pathname.includes('canvas');

  const reactPages = [
    { key: 'react-info', label: 'React 簡介' },
    { key: 'component', label: 'Component 介紹' },
    { key: 'hooks', label: 'Hooks' },
    { key: 'hw/1', label: 'Homework 1' },
    { key: 'hw/2', label: 'Homework 2' },
    { key: 'route-info', label: 'Router 簡介' },
  ];

  const canvasPages = [
    { key: 'react-info', label: 'React 簡介' },
    { key: 'canvas', label: 'Canvas 簡介' },
    { key: 'canvas-api', label: 'Canvas API' },
  ];

  return (
    <aside className="sidebar">
      {isCanvasPage ? (
        <>
          {canvasPages.map((page) => (
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
        </>
      ) : (
        <>
          {reactPages.map((page) => (
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              `sidebar-btn${isActive ? ' active' : ''}`
            }
          >
            Switch to Non-Route
          </NavLink>
          <NavLink
            to="/route-mode/canvas"
            className={({ isActive }) =>
              `sidebar-btn${isActive ? ' active' : ''}`
            }
          >
            Canvas 簡介
          </NavLink>
        </>
      )}
    </aside>
  );
};

export default SidebarWithRoute;
