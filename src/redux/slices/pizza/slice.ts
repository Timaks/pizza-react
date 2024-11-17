import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pizza, PizzasSliceState, Status } from './types'
import { fetchPizzas } from './asyncAction'

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING,
}

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = []
        state.status = Status.LOADING
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = Status.SUCCESS
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = []
        state.status = Status.ERROR
      })
  },
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
