import React from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
  return (
    <div className=' container--cart'>
      <div className='cart'>
        <div className='cart__top'>
          <h2 className='content__title'>Корзина</h2>
          <div className='cart__clear'>
            {/* <% include ../../public/img/trash.svg %> */}
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className='content__items'>
          {/* <% include components/cart-item.ejs %> <% include components/cart-item.ejs %> <%
      include components/cart-item.ejs %> <% include components/cart-item.ejs %> */}
        </div>
        <div className='cart__bottom'>
          <div className='cart__bottom-details'>
            <span>
              {' '}
              Всего пицц: <b>3 шт.</b>{' '}
            </span>
            <span>
              {' '}
              Сумма заказа: <b>900 ₽</b>{' '}
            </span>
          </div>
          <div className='cart__bottom-buttons'>
            <Link
              to='/'
              className='button button--outline button--add go-back-btn'
            >
              {/* <% include ../../public/img/grey-arrow-left.svg %> */}
              <span>Вернуться назад</span>
            </Link>
            <div className='button pay-btn'>
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cart
