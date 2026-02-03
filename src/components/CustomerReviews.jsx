import React from "react";
import { Star } from "lucide-react";

const ratingsData = [
  { stars: 5, count: 32 },
  { stars: 4, count: 1 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const totalReviews = ratingsData.reduce((sum, r) => sum + r.count, 0);
const averageRating = 4.97;

const CustomerReviews = () => {
  return (
    <div className="w-full border-t border-gray-200 py-8 sm:py-10 2xl:py-14 px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-semibold text-center mb-6 sm:mb-8">
        Customer Reviews
      </h2>

      <div
        className="
          max-w-6xl mx-auto
          grid grid-cols-1
          md:grid-cols-3
          gap-8 md:gap-10
          items-center
        "
      >
        {/* LEFT: Average Rating */}
        <div className="text-center space-y-2 sm:space-y-3">
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="fill-yellow-400 text-yellow-400 sm:w-[22px] sm:h-[22px]"
              />
            ))}
          </div>

          <p className="text-base sm:text-lg 2xl:text-xl font-semibold">
            {averageRating} out of 5
          </p>

          <p className="text-gray-500 text-sm 2xl:text-base">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* MIDDLE: Rating Distribution */}
        <div className="space-y-2">
          {ratingsData.map((rating) => {
            const percentage =
              totalReviews === 0
                ? 0
                : (rating.count / totalReviews) * 100;

            return (
              <div
                key={rating.stars}
                className="flex items-center gap-3"
              >
                {/* Stars */}
                <div className="flex w-16 sm:w-20">
                  {[...Array(rating.stars)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-yellow-400 text-yellow-400 sm:w-[14px] sm:h-[14px]"
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div className="flex-1 h-2.5 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Count */}
                <span className="w-6 text-xs sm:text-sm text-gray-600 text-right">
                  {rating.count}
                </span>
              </div>
            );
          })}
        </div>

        {/* RIGHT: CTA */}
        <div className="flex justify-center md:justify-end">
          <button
            className="
              bg-black text-white
              text-base sm:text-lg
              px-8 sm:px-10
              py-2.5
              rounded-full
              font-bold
              hover:opacity-90
              transition
            "
          >
            Write a review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
