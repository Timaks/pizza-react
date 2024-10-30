import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params
    const { data } = await axios.get(
      `https://66fab3a48583ac93b4098801.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

const initialState = {
  items: [],
  status: 'loading',
}

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  // extraReducers: {
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     console.log(state)
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = []
        state.status = 'loading'
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'success'
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = []
        state.status = 'error'
      })
  },
})

export const selectPizzaData = (state) => state.pizzas
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
