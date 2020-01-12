import React from "react";

const Banner = ({ children, title, subtitle }) => {
  return (
    <div className="banner">
      <h1>{title}</h1>
      <div></div>
      <p1>{subtitle}</p1>
      {children}
    </div>
  );
};

export default Banner;
