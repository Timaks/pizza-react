import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  size: number
  type: string
  count: number
}
//type - можем передать что угодно, {}, number, string[]... а interface(чаще для state)-типизирует ТОЛЬКО объект

interface cartSliceState {
  totalPrice: number
  items: CartItem[]
}
const initialState: cartSliceState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
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

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
        // добавили чтобы пицца убиралась, доработать чтобы цена тоже уходила
        // state.items = state.items.filter((obj) => obj.count !== 0)
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})
// selector - функция которая может использоваться несколько раз
export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
