import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FavoriteListState {
  value: Array<any>
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
      let newList = state.value.filter(data => data.name !== action.payload);
      state.value = newList;
    },
    updateFavorite: (state, action: PayloadAction<any>) => {
      let newList = state.value.map((item, index) => {
        if (item.name !== action.payload.name) {
          return item
        }

        return {
          ...item,
          ...action.payload
        }
      })
      state.value = newList;
    }
  }
})

export const { addToList, removeFromList, updateFavorite } = favoriteListSlice.actions

export default favoriteListSlice.reducer