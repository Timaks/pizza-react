import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {/*Outlet- там где надо подгружть динамические роуты(пиццы)  */}
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
