import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload)
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum
    //   }, 0)
    // },
    addItem(state, action) {
      //избегаем дублирования одинаковых пицц, чтобы только увеличивалось значение и стоимость. если объекта нет, то добавляем его
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItem(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, clearItem } = cartSlice.actions

export default cartSlice.reducer