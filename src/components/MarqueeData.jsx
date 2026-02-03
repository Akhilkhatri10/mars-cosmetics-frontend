import React from 'react'
import Marquee from "react-fast-marquee";
import MarqueeHeader from './MarqueeHeader';

const headings = [
  "MARS October Offers are Live Now!",
  "Exciting Gifts & Free Shipping available on Checkout*",
];

const MarqueeData = () => {
  return (
    <div className="w-full overflow-hidden">
      <Marquee
        gradient={false}
        speed={40} // slightly calmer for mobile, still smooth on desktop
        pauseOnHover={true}
        className="
          bg-[#92132f]
          py-2
          sm:py-2
          md:py-3
          lg:py-[15px]
          2xl:py-4
        "
      >
        {headings.map((heading, index) => (
          <MarqueeHeader key={index} heading={heading} />
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeData;
