import React from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import styles from './Seach.module.scss'
import { setSearchValue } from '../../redux/slices/filter/slice'

export const Search: React.FC = () => {
  const dispatch = useDispatch()
  // Быстрое отображение данных инпута
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    // 1 вариант (исп-м 2 вариант c ? - опциональная цепочка)
    // if (inputRef.current) {
    //   inputRef.current.focus()
    // }
    inputRef.current?.focus()
  }

  //React.useCallback вернет функцию... debounce - отложенное выполнение функции
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 300),
    // вызываем один раз при рендере(как useEffect)
    []
  )
  // (event: React.ChangeEvent<HTMLInputElement>)  - понимаем при наведении
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground='new 0 0 32 32'
        id='EditableLine'
        version='1.1'
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='14'
          cy='14'
          fill='none'
          id='XMLID_42_'
          r='9'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='2'
        />
        <line
          fill='none'
          id='XMLID_44_'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='2'
          x1='27'
          x2='20.366'
          y1='27'
          y2='20.366'
        />
      </svg>
      {/* контролируемый инпут  value={searchValue} ..двусторонее связывание */}
      <input
        ref={inputRef}
        value={value}
        //  ТУТ при наведении  на onChange=
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />
      {/* Если в searchValue чтото есть то показываем крестик */}
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z' />
        </svg>
      )}
    </div>
  )
}


