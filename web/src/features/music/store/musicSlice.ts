import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/@types/app'

type InitialStateType = {
  filterTopic: string
}

const initialState: InitialStateType = {
  filterTopic: 'All'
}

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setFilterTopic(state, action: PayloadAction<string>) {
      state.filterTopic = action.payload
    }
  }
})

export default musicSlice.reducer

export const { setFilterTopic } = musicSlice.actions

export const selectCurrentFilterTopic = (state: RootState) => state.music.filterTopic
