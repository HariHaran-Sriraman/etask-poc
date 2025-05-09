import React from "react";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "99vh",
        border: "2px solid black",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default Container;