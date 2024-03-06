import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { Table } from "react-bootstrap";

const BlogList = () => {
    const blogs = useAppSelector((state) => state.blogs);

    return (
        <Table striped bordered hover>
            <tbody>
                {blogs.map((blog) => (
                    <tr key={blog.id} className="blog">
                        <td>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title} {blog.author}
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default BlogList;
