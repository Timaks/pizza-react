import React from 'react'

type CategoriesProps = {
  value: number
  onClickCategory: any
}
//  ({ value, onClickCategory }: CategoriesProps) - можно так, но не хороший способ
const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={value === i ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
        {/* вызываем анонимную ф-ю чтобы не было зацикливания(постоянного редеринга) */}
        {/* onClick={() => onClickCategory()}  делаем анонимную ф-ию чтобы избежать постоянных перерисовок*/}
      </ul>
    </div>
  )
}
export default Categories
