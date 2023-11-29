import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export function useTelegram() {
  useEffect(() => {
    console.log(window.location.pathname)
  }, [window.location.pathname])

  const navigate = useNavigate()
  const location = useLocation()
  const { price } = useSelector((state) => state.items)
  const store = useSelector((state) => state.items)
  const data = { ...store }
  delete data.items

  const tg = window.Telegram.WebApp
  tg.expand()
  tg.MainButton.textColor = '#333'
  tg.MainButton.color = '#ffdf2c'
  try {
    tg.backgroundColor = '#2b2a28'
    tg.headerColor = '#2b2a28'
  } catch (error) {}

  tg.MainButton.onClick(() => {
    if (tg.MainButton.text === `Мой заказ: ${price} ₽`) navigate('/payment')
  })

  // if (window.location.pathname === '/') {
  //   tg.BackButton.hide()
  // } else {
  //   tg.BackButton.show()
  //   tg.BackButton.onClick(() => window.history.back())
  // }

  tg.BackButton.onClick(() => window.history.back())

  const totalPriceButton = () => {
    if (window.location.pathname !== '/payment' && price !== 0) {
      tg.MainButton.show()
      tg.MainButton.text = `Мой заказ: ${price} ₽`
    }
    if (window.location.pathname === '/payment' && price !== 0) {
      tg.MainButton.text = `Оплатить: ${price} ₽`
    } else if (price === 0) {
      tg.MainButton.hide()
    }
  }

  return {
    totalPriceButton,
    tg,
  }
}
