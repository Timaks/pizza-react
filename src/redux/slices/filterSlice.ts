import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type Sort = {
  name: string
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title'
}
interface filterSliceState {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: Sort
}
// начальное состояние и значения по умолчанию
// initialState - начальное состояние слайса стейта, которое будет загружено при первом запуске приложения
const initialState: filterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}
// сам слайс, тут логика обработки наших данных
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  //   данные стейта изменяются при помощи редьюсеров (action-действие)
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      state.sort = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})
export const selectSort = (state: RootState) => state.filter.sort
export const selectFilter = (state: RootState) => state.filter

// вытаскиваем то. что в reducers
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions

// экспортируем reducer - база
export default filterSlice.reducer
