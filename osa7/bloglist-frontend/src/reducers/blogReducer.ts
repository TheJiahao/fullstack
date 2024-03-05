import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogProps } from "../components/Blog";
import { NewBlog } from "../components/CreateBlogForm";
import blogService from "../services/blog_service";

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
            });
    },
});

export { createBlog, deleteBlog, initializeBlogs };
export default blogSlice.reducer;
