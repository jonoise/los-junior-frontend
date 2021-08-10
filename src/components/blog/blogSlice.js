import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    posts: null,
    currentPaginatorPage: 1,
    loading: true,
    searching: false,
    searchQueryValue: ""
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
        },
        setSearching: (state, action) => {
            state.searching = action.payload
        },
        setSearchQueryValue: (state, action) => {
            state.searchQueryValue = action.payload
        },
    }
})

export const {
    setCurrentPaginatorPage,
    setPosts,
    setLoading,
    setSearching,
    setSearchQueryValue
} = blogSlice.actions

export const selectPosts = state => state.blogSlice.posts
export const selectCurrentPaginatorPage = state => state.blogSlice.currentPaginatorPage
export const selectPostsLoading = state => state.blogSlice.loading
export const selectSearching = state => state.blogSlice.searching
export const selectSearchQueryValue = state => state.blogSlice.searchQueryValue

export default blogSlice.reducer