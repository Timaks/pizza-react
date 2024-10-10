import React from 'react'

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/skeleton'

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  // Передаем состояние из категории и сортировки
  const [categoryId, setCategoryId] = React.useState(0)
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  })

  React.useEffect(() => {
    setIsLoading(true)

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    fetch(
      `https://66fab3a48583ac93b4098801.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr)
        setIsLoading(false)
      })
    //Перекидывает наверх сайта и то что [] сдедить за этой переменной и ее изменениями
    window.scrollTo(0, 0)
  }, [categoryId, sortType])

  const pizzas = items
    .filter((obj) => {
      //(фильтруем) если в obj.title содержится чтото из searchValue, то оставляем это в
      //массиве, иначе убираем(делаем все в нижнем регистре, чтобы при поиске выводилось все)
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true
      }
      return false
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))
  return (
    <div className="container">
      <div className="content__top">
        {/* можно назвать как угодно i */}
        <Categories
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}

        {/* // если в объекте названия одинаковые то сокращаем */}
      </div>
    </div>
  )
}
export default Home
