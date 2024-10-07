import React from 'react'

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/skeleton'

const Home = () => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  // Передаем состояние из категории и сортировки
  const [categoryId, setCategoryId] = React.useState(0)
  const [sortType, setSortType] = React.useState(0)

  React.useEffect(() => {
    setIsLoading(true)
    fetch(
      'https://66fab3a48583ac93b4098801.mockapi.io/items?category=' + categoryId
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr)
        setIsLoading(false)
      })
    //Перекидывает наверх сайта и то что [] сдедить за этой переменной и ее изменениями
    window.scrollTo(0, 0)
  }, [categoryId])
  return (
    <div className='container'>
      <div className='content__top'>
        {/* можно назвать как угодно i */}
        <Categories
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}

        {/* // если в объекте названия одинаковые то сокращаем */}
      </div>
    </div>
  )
}
export default Home
