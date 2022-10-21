import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
import Button from "../components/button/Button";

const LinkItem = [
  {
    url: "/#",
    title: "Home",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
const Header = () => {
  const { userInfo } = useAuth();
  return (
    <div className="w-full max-w-[1180px] rounded-lg mt-6 mx-auto py-4 px-6 bg-bg-secondary cursor-pointer">
      <div className="flex items-center justify-center">
        <NavLink to="/" className="w-[100px] h-full sm:hidden md:block">
          <img
            className="w-full h-full object-cover"
            src="https://i.imgur.com/nokkfil.png"
            alt=""
          />
        </NavLink>
        <ul className="flex items-center gap-5 mx-4 text-base font-semibold">
          {LinkItem.map((item) => (
            <NavLink key={item.title} className="flex" to={item.url}>
              <li>{item.title}</li>
            </NavLink>
          ))}
          {userInfo ? (
            <NavLink className="flex" to="/post">
              <li>Dashboard</li>
            </NavLink>
          ) : (
            ""
          )}
        </ul>
        <div className="ml-auto w-full max-w-[500px] flex gap-2">
          <input
            className="px-4 w-full sm:hidden md:block text-text-color bg-bg-primary  rounded-lg"
            placeholder="Search post"
            type="text"
          />
          {!userInfo ? (
            <NavLink to="/sign-in">
              <Button
                className="py-3 px-6 font-bold bg-bg-primary rounded-md
               outline-none "
              >
                Login
              </Button>
            </NavLink>
          ) : (
            <div className="flex sm:hidden md:flex  justify-center items-center gap-2">
              <div className="w-[50px] h-[50px]">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={userInfo.avatar}
                  alt=""
                />
              </div>
              <div className="py-3 px-4 font-bold  bg-bg-primary rounded-md outline-none ">
                {userInfo?.username}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
