import React from 'react'

import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import './scss/app.scss'
import { Routes, Route } from 'react-router-dom'

// чтобы вынести отдельные куски кода
export const SearchContext = React.createContext('')

function App() {
  // пропс дриллинг, передача св-в компонентам, из app в Header, потом Search и там используем
  const [searchValue, setSearchValue] = React.useState('')

  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  )
}

export default App
