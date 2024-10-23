import { createSlice } from '@reduxjs/toolkit'

// начальное состояние и значения по умолчанию
// initialState - начальное состояние слайса стейта, которое будет загружено при первом запуске приложения
const initialState = {
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
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.sort = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})
export const selectSort = (state) => state.filter.sort
export const selectFilter = (state) => state.filter

// вытаскиваем то. что в reducers
export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions

// экспортируем reducer - база
export default filterSlice.reducer
