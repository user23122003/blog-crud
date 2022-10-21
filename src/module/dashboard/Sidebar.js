// import { signOut } from "firebase/auth";
import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase-app/firebaseconfig";
// import { auth } from "../firebase-app/firebaseconfig";
const SidebarStyles = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 4px 5px;
  transition: all 500ms ease;
  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 20px;
    cursor: pointer;
    &.active,
    &:hover {
      transition: all 500ms ease;
      border-radius: 12px;
      background: var(--bg-dark);
      color: ${(props) => props.theme.primary};
    }
  }
  @media screen and (max-width: 800.98px) {
    display: block;
    padding: 4px 8px;
    margin-bottom: 10px;
    .menu-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 2px 4px;
      font-weight: 500;
      color: var(--text-color);
      margin-bottom: 20px;
      cursor: pointer;
      &.active,
      &:hover {
        transition: all 500ms ease;
        border-radius: 12px;
        background: var(--bg-dark);
        color: ${(props) => props.theme.primary};
      }
    }
  }
`;
const sidebarLinks = [
  {
    title: "Post",
    url: "/post",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Category",
    url: "/category",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    title: "User",
    url: "/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Logout",
    url: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
    onClick: () => signOut(auth),
  },
];
const Sidebar = () => {
  return (
    <SidebarStyles className="sidebar shadow-lg sm:w-full md:w-[400px]">
      {sidebarLinks.map((link) => {
        if (link.onClick)
          return (
            <div
              className="menu-item !p-1"
              onClick={link.onClick}
              key={link.title}
            >
              <span className="menu-icon">{link.icon}</span>
              <span className="menu-text">{link.title}</span>
            </div>
          );
        return (
          <NavLink to={link.url} className="menu-item" key={link.title}>
            <span className="menu-icon">{link.icon}</span>
            <span className="menu-text">{link.title}</span>
          </NavLink>
        );
      })}
    </SidebarStyles>
  );
};

export default Sidebar;