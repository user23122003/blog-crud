import React from "react";

const CommonPage = ({ children }) => {
  return (
    <div className="p-6 rounded-lg w-[500px] shadow-xl  mx-auto mt-20 bg-bg-secondary">
      <h1 className="font-medium text-text-color text-lg text-center p-4">
        Chào mừng bạn đã đến đây :D
      </h1>
      <div className="w-full flex justify-center items-center p-2">
        <img
          className="w-1/4 object-cover"
          src="https://i.imgur.com/nokkfil.png"
          alt="logo"
        />
      </div>
      {children}
    </div>
  );
};

export default CommonPage;
