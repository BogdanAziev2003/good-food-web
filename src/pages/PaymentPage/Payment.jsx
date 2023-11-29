import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTelegram } from '../../hooks/useTelegram'

import PaymentItem from '../../components/Payment/PaymentItem'
import Phone from '../../components/Payment/Phone'
import PayMethod from '../../components/Payment/PayMethod'
import PaymentComponent from '../../components/Payment/PaymentComponent'
import Comment from '../../components/Payment/Comment'

const Payment = () => {
  const [errors, setErrors] = useState({
    phone: false,
    deliveryType: false,
    payMethod: false,
    address: false,
  })
  const [phoneError, setPhoneError] = useState(false)

  const { itemInCard } = useSelector((state) => {
    const itemsCount = state.items.itemInCard.reduce((acc, item) => {
      const existingItem = acc.find(
        (i) =>
          i.id === item.id &&
          i.sause === item.sause &&
          i.snack === item.snack &&
          JSON.stringify(i.modifiers) === JSON.stringify(item.modifiers)
      )
      if (existingItem) {
        console.log(item)
        existingItem.count += 1
      } else {
        acc.push({ ...item, count: 1 })
      }
      return acc
    }, [])

    return { itemInCard: itemsCount }
  })

  const { tg } = useTelegram()
  const store = useSelector((state) => state.items)
  console.log(store.phone)

  const onSendData = useCallback(() => {
    const data = {
      price: store.price,
      address: store.address,
      phone: store.phone,
      deliveryType: store.deliveryType,
      payMethod: store.payMethod,
      comment: store.comment,
      itemInCard: store.itemInCard.map((item) => {
        const newItem = { title: item.title, price: item.price }
        if (item.category === 'Сэндвичи') {
          newItem.snack = item.snack
          newItem.sause = item.sause
        }
        if (item.modifiers && item.modifiers.length > 0) {
          newItem.modifiers = item.modifiers
            .filter((modifier) => modifier.amount > 0)
            .map((modifier) => ({
              title: modifier.title,
              price: modifier.price,
              amount: modifier.amount,
            }))
        } else {
          newItem.modifiers = []
        }
        return newItem
      }),
    }
    tg.sendData(JSON.stringify(data))
  }, [
    store.price,
    store.address,
    store.phone,
    store.deliveryType,
    store.payMethod,
    store.itemInCard,
    store.comment,
  ])

  useEffect(() => {
    if (
      !store.phone ||
      !store.deliveryType ||
      !store.payMethod ||
      (store.deliveryType === 'delivery' && !store.address)
    ) {
      if (store.deliveryType === 'delivery' && !store.address) {
        setErrors({
          deliveryType: true,
          address: true,
        })
      } else {
        setErrors({
          phone: !store.phone,
          deliveryType: !store.deliveryType,
          payMethod: !store.payMethod,
          address: false,
        })
      }
    } else {
      setErrors({
        phone: false,
        deliveryType: false,
        payMethod: false,
        address: false,
      })
      tg.onEvent('mainButtonClicked', onSendData)
    }
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [
    onSendData,
    store.deliveryType,
    store.payMethod,
    store.phone,
    store.address,
    tg,
  ])

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
      {phoneError && <p>'Введите номер телефона'</p>}
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
