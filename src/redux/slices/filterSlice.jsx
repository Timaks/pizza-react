import { createSlice } from '@reduxjs/toolkit'

// начальное состояние и значения по умолчанию
// initialState - начальное состояние слайса стейта, которое будет загружено при первом запуске приложения
const initialState = {
  categoryId: 0,
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
    setSort(state, action) {
      state.sort = action.payload
    },
  },
})
// вытаскиваем то. что в reducers
export const { setCategoryId, setSort } = filterSlice.actions

// экспортируем reducer - база
export default filterSlice.reducer
