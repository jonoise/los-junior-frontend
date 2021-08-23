import {
  configureStore
} from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import blogSlice from '../components/blog/blogSlice'
import pageSlice from '../components/pages/pageSlice'
import pageSettingsSlice from '../components/pages/pageSettingsSlice'
import markdownEditorSlice from '../components/pages/PageDetail/editorComponents/markdownEditor/markdownEditorSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    blogSlice: blogSlice,
    pageSlice: pageSlice,
    pageSettingsSlice: pageSettingsSlice,
    markdownEditorSlice: markdownEditorSlice
  },
})