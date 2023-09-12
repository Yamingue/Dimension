import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



const initialState: number = -1

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<number>) => {
      return action.payload

    },
  },
})

// Action creators are generated for each case reducer function
export const { update } = counterSlice.actions

export default counterSlice.reducer