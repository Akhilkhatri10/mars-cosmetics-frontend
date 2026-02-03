import React from "react";
import MarqueeData from "./MarqueeData";
import Navbar from "./Navbar";

const StickyHeader = () => {
  return (
    <div
      className="
        sticky top-0
        z-40
        w-full
      "
    >
      {/* Wrapper to control width on very large screens */}
      <div className="max-w-screen-2xl mx-auto">
        <MarqueeData />
        <Navbar />
      </div>
    </div>
  );
};

export default StickyHeader;
