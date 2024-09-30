import React from 'react'
import './App.css'
import Categories from './components/Categories'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'
import Sort from './components/Sort'

// import pizzas from './assets/pizzas.json'
function App() {
  const [items, setItems] = React.useState([])
  // https://66fab3a48583ac93b4098801.mockapi.io/items

  // Будет постоянная перерисовка, чтобы не было используем хук эффект
  fetch('https://66fab3a48583ac93b4098801.mockapi.io/items')
    .then((res) => {
      return res.json()
    })
    .then((arr) => {
      setItems(arr)
    })
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {items.map((obj) => (
                // если в объекте названия одинаковые то сокращаем
                <PizzaBlock key={obj.id} {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
