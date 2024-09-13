import React from 'react'
function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]
  const onClickCategory = (index) => {
    setActiveIndex(index)
  }
  return (
    <div className="categories">
      <ul>
        {/* onClick={() => onClickCategory()}  делаем анонимную ф-ию чтобы избежать постоянных перерисовок*/}
        {/* <li onClick={() => onClickCategory()} className="active">
          Все
        </li> */}
      </ul>
    </div>
  )
}
export default Categories
