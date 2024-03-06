import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";

const BlogList = () => {
    const blogs = useAppSelector((state) => state.blogs);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    return (
        <div>
            {blogs.map((blog) => (
                <div key={blog.id} className="blog" style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
