import {
  configureStore
} from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import blogSlice from '../components/blog/blogSlice'
import pageSlice from '../components/pages/pageSlice'
import pageSettingsSlice from '../components/pages/pageSettingsSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    blogSlice: blogSlice,
    pageSlice: pageSlice,
    pageSettingsSlice: pageSettingsSlice,
  },
})