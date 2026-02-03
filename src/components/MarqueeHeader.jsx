import React from 'react';

const MarqueeHeader = ({ heading }) => {
  return (
    <div
      className="
        flex items-center whitespace-nowrap
        text-white font-semibold cursor-pointer

        mx-3
        sm:mx-4
        md:mx-6
        lg:mx-10
        2xl:mx-14

        text-[11px]
        sm:text-xs
        md:text-sm
        lg:text-base
        xl:text-base
        2xl:text-lg
      "
    >
      {heading}
    </div>
  );
};

export default MarqueeHeader;
