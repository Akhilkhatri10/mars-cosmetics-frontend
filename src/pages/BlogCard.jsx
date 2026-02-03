import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/blogs/${blog._id}`)}
            className="
        group
        bg-white rounded-xl overflow-hidden
        shadow-md
        transition-all duration-300 ease-out
        hover:shadow-2xl hover:-translate-y-2
        cursor-pointer
      "
        >
            {/* Image wrapper */}
            <div className="overflow-hidden">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="
            w-full
            h-36 sm:h-44 md:h-52 lg:h-56 xl:h-58 2xl:h-64
            object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-105
          "
                />
            </div>

            <div className="p-3 sm:p-6 md:p-8 lg:p-10 2xl:p-12">
                <h3 className="
          text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl
          font-bold text-gray-900
          mb-2
        ">
                    {blog.title}
                </h3>

                <p className="
          text-sm sm:text-base md:text-lg lg:text-lg 2xl:text-xl
          text-gray-800
          mb-4 mt-3 sm:mt-4
          line-clamp-3
        ">
                    {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
                </p>

                <span
                    className="
            inline-block
            text-blue-600 font-medium
            transition-transform duration-300
            group-hover:translate-x-1
          "
                >
                    Read More →
                </span>
            </div>
        </div>
    );
};

export default BlogCard;
