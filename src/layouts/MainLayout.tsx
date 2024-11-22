import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components'

const MainLayout: React.FC = () => {
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
