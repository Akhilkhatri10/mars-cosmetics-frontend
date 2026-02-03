import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import React from 'react';
import image13 from '../assets/image13.webp';
import image14 from '../assets/image14.webp';
import image15 from '../assets/image15.webp';

const Slider = () => {
  return (
    <Swiper
      loop
      speed={1000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="w-full overflow-hidden"
    >
      {[image13, image14, image15].map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt=""
            className="
              w-full

              /* 🔹 MOBILE */
              h-[22vh]
              object-contain

              /* 🔹 SMALL PHONES */
              sm:h-[28vh]

              /* 🔹 TABLETS */
              md:h-[36vh]

              /* 🔹 DESKTOP – UNCHANGED */
              lg:h-[55vh] lg:object-cover
              xl:h-[80vh]
              2xl:h-[90vh]
            "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
