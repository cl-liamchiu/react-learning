import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';

import './Sidebar.css';

const SidebarWithRoute: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isReactPage = pathname.includes('react');

  const reactPages = [
    { key: 'react-info', label: 'React 簡介' },
    { key: 'react-component', label: 'Component 介紹' },
    { key: 'react-hooks', label: 'Hooks' },
    { key: 'react-hw/1', label: 'Homework 1' },
    { key: 'react-hw/2', label: 'Homework 2' },
    { key: 'react-route-info', label: 'Router 簡介' },
  ];

  const canvasPages = [
    { key: 'react-info', label: 'React 簡介' },
    { key: 'canvas', label: 'Canvas 簡介' },
    { key: 'canvas-api', label: 'Canvas API' },
    { key: 'canvas-image-manipulation', label: 'Image Manipulation' },
    { key: 'canvas-hw/3', label: 'Homework 3' },
    { key: 'canvas-hw/4', label: 'Homework 4' },
    { key: 'canvas-hw/5', label: 'Homework 5' },
  ];

  return (
    <aside className="sidebar">
      {isReactPage ? (
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
      ) : (
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
      )}
    </aside>
  );
};

export default SidebarWithRoute;
