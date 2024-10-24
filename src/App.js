import React from 'react'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import FullPizza from './pages/FullPizza'
import './scss/app.scss'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cart" element={<Cart />} />
          {/* :id - указываем динамическое название (подставляются будущие пиццы- страницы) */}
          <Route path="/pizza/:id" element={<FullPizza />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
