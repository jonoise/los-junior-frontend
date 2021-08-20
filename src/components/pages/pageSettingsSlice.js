import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    editorIsOpen: false,
    currentComponentId: null,
    currentEditor: null,
    unsavedChanges: false,
    isDragging: false,
}

const pageSettingsSlice = createSlice({
    name: "pageSettings",
    initialState,
    reducers: {
        toggleEditor: (state) => {
            state.editorIsOpen = !state.editorIsOpen
        },
        setEditorIsOpen: (state, action) => {
            state.editorIsOpen = action.payload
        },
        setEditor: (state, action) => {
            const {
                uuid,
                type_
            } = action.payload
            state.currentComponentId = uuid
            state.currentEditor = type_
        },
        setUnsavedChanges: (state, action) => {
            state.unsavedChanges = action.payload
        },
        setIsDragging: (state, action) => {
            state.isDragging = action.payload
        },


    }
})


export const {
    setEditorIsOpen,
    toggleEditor,
    setEditor,
    setUnsavedChanges,
    setIsDragging
} = pageSettingsSlice.actions

export const selectPageSettings = state => state.pageSettingsSlice

export default pageSettingsSlice.reducer