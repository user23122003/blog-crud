import React from "react";

const Table = ({ children }) => {
  return (
    <table
      className="md:w-full sm:max-w-[500px] text-sm overflow-auto text-center text-text-color rounded-lg 
      justify-center bg-bg-primary"
    >
      {children}
    </table>
  );
};

export default Table;
