import React from 'react'
// import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'

type CategoriesProps = {
  value: number
  // стрелочная функция (void - не требует возвращения какого-то значения)
  //  onClickCategory?: ? - делает необязательным параметром
  onClickCategory: (i: number) => void
}
const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
]
//  ({ value, onClickCategory }: CategoriesProps) - можно так, но не хороший способ
const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
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
)
export default Categories
