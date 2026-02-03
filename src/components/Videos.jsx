import React from 'react'
import video1 from '../assets/video1.mp4'
import video2 from '../assets/video2.mp4'
import video3 from '../assets/video3.mp4'
import video4 from '../assets/video4.mp4'

const Videos = () => {
    return (
        <div className="
  flex flex-col bg-gray-200 w-full
  py-8 sm:py-10 lg:py-10
">
            <div className="mb-6 sm:mb-8 -mt-5 sm:-mt-7">
                <h1 className="text-center font-semibold text-xl sm:text-2xl">
                    Own this look!
                </h1>
                <h1 className="text-center text-lg sm:text-xl">
                    Own the latest Trends
                </h1>
            </div>


            <div className="
  grid grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-4
  gap-4 sm:gap-5
  max-w-7xl 2xl:max-w-screen-2xl
  mx-auto
  px-4 sm:px-6
">

                {[video1, video2, video3, video4].map((vid, idx) => (
                    <div 
  key={idx} 
  className="
    max-sm:w-[90vw]
    w-full
    h-[400px]
    sm:h-[350px]
    md:h-[420px]
    lg:h-[400px]
    2xl:h-[480px]
    rounded-xl
    overflow-hidden
  "
>

                        <video
                            src={vid}
                            controls
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-cover"
                        ></video>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Videos
