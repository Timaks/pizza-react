import React from 'react'

import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import FullPizza from './pages/FullPizza'
import './scss/app.scss'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
            {/* :id - указываем динамическое название (подставляются будущие пиццы- страницы) */}
            <Route path="/pizza/:id" element={<FullPizza />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
