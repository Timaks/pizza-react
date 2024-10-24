import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const FullPizza = () => {
  const [pizza, setPizza] = useState()
  const { id } = useParams()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://66fab3a48583ac93b4098801.mockapi.io/items/' + id
        )
        setPizza(data)
      } catch (error) {
        alert('Ошибка при подключении')
      }
    }
    fetchPizza()
  }, [])

//   чтобы при загрузке не было ошибки и undefined
  if (!pizza) {
    return 'Загрузка'
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}₽</h4>
    </div>
  )
}

export default FullPizza
