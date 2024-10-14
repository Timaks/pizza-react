import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCategoryId } from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

const Home = () => {
  // единственный способ изменить state - это вызвать метод dispatch, который есть у store и передать объект action
  const dispatch = useDispatch()
  // useSelector вшит уже useContext
  const { categoryId, sort } = useSelector((state) => state.filter)

  // нужен только searchValue для получения данных , изменение не надо
  // Следи за изменением контекста, и перерисуется с новыми данными
  const { searchValue } = React.useContext(SearchContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const [currentPage, setCurrentPage] = React.useState(1)

  // Внутри функции мы вызываем dispatch, формируем объект action, в свойство payload
  // которого у нас попадут сгенерированный id. Все эти данные мы берем из локальных стейтов.
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  React.useEffect(() => {
    setIsLoading(true)

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    fetch(
      `https://66fab3a48583ac93b4098801.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))
  return (
    <div className="container">
      <div className="content__top">
        {/* можно назвать как угодно i */}
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  )
}
export default Home
