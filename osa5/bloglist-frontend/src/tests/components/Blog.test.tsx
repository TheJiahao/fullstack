import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog, { BlogProps } from "../../components/Blog";

test("renders only title and author by default", () => {
  const blog: BlogProps = {
    id: "testblog",
    title: "A blog title",
    author: "Author of the blog",
    url: "www.example.com",
    likes: 100,
    user: {
      name: "User",
      username: "username",
      password: "password",
      token: "12312asdasd",
    },
  };

  const { container } = render(
    <Blog blog={blog} blogs={[]} setBlogs={() => {}} username="testusername" />
  );
  const detail = container.querySelector("#blog-detail");

  expect(
    screen.getByText("A blog title Author of the blog", { exact: false })
  ).toBeDefined();
  expect(detail).toHaveStyle("display: none");
});
