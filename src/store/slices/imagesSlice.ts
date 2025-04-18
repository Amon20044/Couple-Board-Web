import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface ImageState {
  value : number
}

const initialState : ImageState = {
 value : 0
}

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers:{
    setTotalImages:(state,action: PayloadAction<number>)=>{
      state.value = action.payload
    }
  }

})

export const { setTotalImages } = imageSlice.actions
export const selectImageCount = (state: RootState) => state.images.value
export default imageSlice.reducer