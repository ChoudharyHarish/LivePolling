import React from "react";
import icon from "../icons/star.svg";

const Header = () => {
  return (
    <div
      className="text-sm font-medium bg-violet-100 p-3 gap-2 text-white rounded-full mb-4 flex items-center"
      style={{
        background: "linear-gradient(to right, #7565D9, #4D0ACD)",
      }}
    >
      <img src={icon} alt="" /> Intervue Poll
    </div>
  );
};

export default Header;
