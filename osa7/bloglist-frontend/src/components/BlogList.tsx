import { useAppSelector } from "../hooks";
import Blog from "./Blog";

const BlogList = () => {
    const blogs = useAppSelector((state) => state.blogs);

    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                />
            ))}
        </div>
    );
};

export default BlogList;
