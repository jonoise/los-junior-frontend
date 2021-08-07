import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    posts: null,
    currentPaginatorPage: 1,
    loading: true,
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        setCurrentPaginatorPage: (state, action) => {
            state.currentPaginatorPage = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {
    setCurrentPaginatorPage,
    setPosts,
    setLoading
} = blogSlice.actions

export const selectPosts = state => state.blogSlice.posts
export const selectCurrentPaginatorPage = state => state.blogSlice.currentPaginatorPage
export const selectPostsLoading = state => state.blogSlice.loading

export default blogSlice.reducer