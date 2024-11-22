import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>()
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://66fab3a48583ac93b4098801.mockapi.io/items/' + id
        )
        setPizza(data)
      } catch (error) {
        alert('Ошибка при подключении')
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  //   чтобы при загрузке не было ошибки и undefined
  if (!pizza) {
    return <>Загрузка</>
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza
