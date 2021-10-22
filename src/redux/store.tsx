import { configureStore } from '@reduxjs/toolkit'
import favoriteListReducer from './favoriteListSlice'

export const store = configureStore({
  reducer: {
    favoriteList: favoriteListReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch