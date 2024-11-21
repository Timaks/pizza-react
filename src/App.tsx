import React, { Suspense } from 'react'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './scss/app.scss'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ './pages/Cart')
)
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza')
)

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>Загрузка корзины...</div>}>
                <Cart />
              </Suspense>
            }
          />
          {/* :id - указываем динамическое название (подставляются будущие пиццы- страницы) */}
          <Route
            path="/pizza/:id"
            element={
              <Suspense fallback={<div>Загрузка пиццы...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
