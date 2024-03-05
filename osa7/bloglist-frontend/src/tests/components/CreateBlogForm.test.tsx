import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "../../components/CreateBlogForm";

test("callback function called with correct parameters when creating blog", async () => {
    const newBlog = {
        title: "A cool title",
        author: "Author of the blog",
        url: "example.com",
    };

    const handlerMock = jest.fn();

    const { container } = render(<CreateBlogForm createBlog={handlerMock} />);

    const submitButton = screen.getByText("create");
    const titleInput = container.querySelector("#title-input") as Element;
    const authorInput = container.querySelector("#author-input") as Element;
    const urlInput = container.querySelector("#url-input") as Element;

    const user = userEvent.setup();

    await user.type(titleInput, newBlog.title);
    await user.type(authorInput, newBlog.author);
    await user.type(urlInput, newBlog.url);
    await user.click(submitButton);

    expect(handlerMock.mock.calls[0][0]).toEqual(newBlog);
});
