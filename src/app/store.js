import {
  configureStore
} from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import blogSlice from '../components/blog/blogSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    blogSlice: blogSlice,
  },
})