import {
    createSlice
} from "@reduxjs/toolkit";

const markdownEditorSlice = createSlice({
    name: 'markdownEditorSlice',
    initialState: {
        content: ''
    },
    reducers: {
        refreshContent: (state, action) => {
            state.content = action.payload
        }
    }
})

export const {
    refreshContent
} = markdownEditorSlice.actions

export const selectStateMarkdownContent = (state) => state.markdownEditorSlice.content

export default markdownEditorSlice.reducer