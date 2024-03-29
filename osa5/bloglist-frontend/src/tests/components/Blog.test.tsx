import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog, { BlogProps } from "../../components/Blog";
import userEvent from "@testing-library/user-event";

const blog: BlogProps = {
  id: "testblog",
  title: "A blog title",
  author: "Author of the blog",
  url: "www.example.com",
  likes: 100,
  user: {
    name: "Firstname Lastname",
    username: "username",
    password: "password",
    token: "12312asdasd",
  },
};

test("renders only title and author by default", () => {
  const { container } = render(
    <Blog
      blog={blog}
      username="testusername"
      handleDelete={() => {}}
      handleLike={() => {}}
    />
  );
  const detail = container.querySelector(".blog-detail");

  expect(
    screen.getByText("A blog title Author of the blog", { exact: false })
  ).toBeDefined();
  expect(detail).toHaveStyle("display: none");
});

test("details are shown after clicking show button", async () => {
  render(
    <Blog
      blog={blog}
      username="testusername"
      handleDelete={() => {}}
      handleLike={() => {}}
    />
  );

  const showButton = screen.getByText("view");

  const user = userEvent.setup();
  await user.click(showButton);

  [blog.url, blog.likes, blog.user.name]
    .map((field) => screen.getByText(field, { exact: false }))
    .forEach((field) => expect(field).not.toHaveStyle("display: none"));
});

test("handleLike is called twice when like button is clicked twice", async () => {
  const handleLikeMock = jest.fn();

  render(
    <Blog
      blog={blog}
      username="testusername"
      handleDelete={() => {}}
      handleLike={handleLikeMock}
    />
  );

  const likeButton = screen.getByText("like");

  const user = userEvent.setup();
  await user.click(likeButton);
  await user.click(likeButton);

  expect(handleLikeMock.mock.calls).toHaveLength(2);
});
