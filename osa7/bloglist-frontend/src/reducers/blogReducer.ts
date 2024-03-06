import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogProps } from "../components/Blog";
import { NewBlog } from "../components/CreateBlogForm";
import blogService from "../services/blogService";
import { RootState } from "../store";
import commentService from "../services/commentService";

const sortByLikes = (a: BlogProps, b: BlogProps) => b.likes - a.likes;

const initializeBlogs = createAsyncThunk(
    "blogs/initializeBlogs",
    async () => await blogService.getAll(),
);

const createBlog = createAsyncThunk(
    "blogs/createBlog",
    async (newBlog: NewBlog) => await blogService.create(newBlog),
);

const deleteBlog = createAsyncThunk(
    "blogs/deleteBlog",
    async (id: string) => await blogService.remove(id),
);

const likeBlog = createAsyncThunk(
    "blogs/likeBlog",
    async (id: string, thunkAPI) => {
        const blog = (thunkAPI.getState() as RootState).blogs.find(
            (blog) => blog.id === id,
        ) as BlogProps;

        const newBlog = await blogService.update({
            ...blog,
            likes: blog.likes + 1,
        });

        return newBlog;
    },
);

const commentBlog = createAsyncThunk(
    "blogs/commentBlog",
    async ({ blogId, content }: { blogId: string; content: string }) =>
        await commentService.create(blogId, content),
);

const blogSlice = createSlice({
    name: "blogs",
    initialState: new Array<BlogProps>(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeBlogs.fulfilled, (state, action) => {
                return action.payload.sort(sortByLikes);
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.push(action.payload);
                state.sort(sortByLikes);
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                const id = action.payload;
                return state.filter((blog) => blog.id !== id).sort(sortByLikes);
            })
            .addCase(likeBlog.fulfilled, (state, action) => {
                const newBlog = action.payload;

                return state
                    .map((blog) => (blog.id === newBlog.id ? newBlog : blog))
                    .sort(sortByLikes);
            })
            .addCase(commentBlog.fulfilled, (state, action) => {
                const comment = action.payload;
                const id = comment.blog;

                const blog = state.find((blog) => blog.id === id) as BlogProps;

                blog.comments.push(comment);
            });
    },
});

export { createBlog, deleteBlog, initializeBlogs, likeBlog, commentBlog };
export default blogSlice.reducer;
