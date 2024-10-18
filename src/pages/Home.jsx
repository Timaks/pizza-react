import React, { useRef } from 'react'
import qs from 'qs'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import { Sort, sortList } from '../components/Sort'
import Skeleton from '../components/PizzaBlock/skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import axios from 'axios'

const Home = () => {
  // единственный способ изменить state - это вызвать метод dispatch, который есть у store и передать объект action
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = React.useRef(false)
  //ОТвечает за первый рендер
  const isMounted = useRef(false)

  // useSelector вшит уже useContext
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)

  // нужен только searchValue для получения данных , изменение не надо. Следит за изменением контекста, и перерисуется с новыми данными
  const { searchValue } = React.useContext(SearchContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Внутри функции мы вызываем dispatch, формируем объект action, в свойство payload которого у нас попадут сгенерированный id. Все эти данные мы берем из локальных стейтов.
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  }

  const fetchPizzas = () => {
    setIsLoading(true)

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios
      .get(
        `https://66fab3a48583ac93b4098801.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
      })
  }
  //Ссылки на фильры и меню отображаются в url (isMounted - первый рендер, нет фильтров в ссылках)
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    // useEffect отрабатывает с первым рендером, когда рендер произошел то ставим true, и добавляем парметры к юрл
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])

  // Достаем ссылки, парсим и превращаем в объект, чтобы передать в redux - dispatch (substring(1) --убираем ?)
  // Если был первый рендер, то проверяем url-параметры и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      )
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      isSearch.current = true
    }
  }, [])
// Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0)
    // Если сейчас нет поиска по qwery параметрам, то делаем fetch запрос (ждем пока загрузятся данные, смотря есть ли запрос в адресной строке)
    if (!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}
export default Home
