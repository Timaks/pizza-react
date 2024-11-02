import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// сокращаем типизацию одинаковых значений на Record (order, sortBy, category, search, currentPage)
// type FetchPizzasArgs = Record<string, string>

type Pizza = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}
interface PizzasSliceState {
  items: Pizza[]
  status: 'loading' | 'success' | 'error'
}

const initialState: PizzasSliceState = {
  items: [],
  status: 'loading',
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params
    const { data } = await axios.get(
      `https://66fab3a48583ac93b4098801.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)
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

export const selectPizzaData = (state: RootState) => state.pizzas
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
