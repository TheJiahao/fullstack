import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogProps } from "../components/Blog";
import { NewBlog } from "../components/CreateBlogForm";
import blogService from "../services/blog_service";

const sortByLikes = (a: BlogProps, b: BlogProps) => b.likes - a.likes;

const createBlog = createAsyncThunk(
    "blogs/createBlog",
    async (newBlog: NewBlog) => await blogService.create(newBlog),
);

const blogSlice = createSlice({
    name: "blogs",
    initialState: new Array<BlogProps>(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createBlog.fulfilled, (state, action) => {
            state.push(action.payload);
            state.sort(sortByLikes);
        });
    },
});

export { createBlog };
export default blogSlice.reducer;
