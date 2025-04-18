import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface albumState {
  value : number
}

const initialState : albumState = {
 value : 0
}

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers:{
    setTotalAlbums:(state,action: PayloadAction<number>)=>{
      state.value = action.payload
    }
  }

})

export const { setTotalAlbums } = albumSlice.actions
export const selectAlbumCount = (state: RootState) => state.album.value
export default albumSlice.reducer