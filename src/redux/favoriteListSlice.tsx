import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FavoriteListState {
  value: Array<string>
}

const initialState: FavoriteListState = {
  value: [],
}

export const favoriteListSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<any>) => {
      state.value.push(action.payload);
    },
    removeFromList: (state, action: PayloadAction<any>) => {
      let newList = state.value.filter( data => data !== action.payload);
      state.value = newList;
    }
  }
})

export const { addToList, removeFromList } = favoriteListSlice.actions

export default favoriteListSlice.reducer