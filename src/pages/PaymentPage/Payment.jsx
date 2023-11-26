import React from 'react'
import { useSelector } from 'react-redux'

import PaymentItem from '../../components/Payment/PaymentItem'
import Phone from '../../components/Payment/Phone'
import PayMethod from '../../components/Payment/PayMethod'
import PaymentComponent from '../../components/Payment/PaymentComponent'
import Comment from '../../components/Payment/Comment'

const Payment = () => {
  const { itemInCard } = useSelector((state) => {
    const itemsCount = state.items.itemInCard.reduce((acc, item) => {
      const existingItem = acc.find(
        (i) =>
          i.id === item.id &&
          JSON.stringify(i.modifiers) === JSON.stringify(item.modifiers)
      )
      if (existingItem) {
        existingItem.count += 1
      } else {
        acc.push({ ...item, count: 1 })
      }
      return acc
    }, [])

    return { itemInCard: itemsCount }
  })

  return (
    <div className="main">
      <div className="item-wrapper">
        <div className="item-list">
          {itemInCard.map((el) => (
            // Все элементы корзины
            <PaymentItem item={el} key={el.idInCard} />
          ))}
        </div>
      </div>
      {/* Номер телефона */}
      <Phone />
      {/* Способ Оплаты */}
      <PayMethod />
      {/* Способ доставки */}
      <PaymentComponent />
      {/* Комментарий */}
      <Comment />
    </div>
  )
}

export default Payment
