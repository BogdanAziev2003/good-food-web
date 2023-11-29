import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function useTelegram() {
  const navigate = useNavigate()
  const { price } = useSelector((state) => state.items)
  const store = useSelector((state) => state.items)
  const data = { ...store }
  delete data.items

  const tg = window.Telegram.WebApp
  tg.expand()
  tg.MainButton.textColor = '#333'
  tg.MainButton.color = '#ffdf2c'
  tg.buttonColor = '#f00'
  try {
    tg.backgroundColor = '#2b2a28'
    tg.headerColor = '#2b2a28'
    tg.textColor = '#ffdf2c'
  } catch (error) {}

  console.log(tg)

  tg.MainButton.onClick(() => {
    if (tg.MainButton.text === `Мой заказ: ${price} ₽`) navigate('/payment')
  })

  if (window.location.pathname === '/') {
    tg.BackButton.hide()
  } else {
    tg.BackButton.show()
    if (window.location.pathname === '/payment') {
      tg.BackButton.onClick(() => navigate('/'))
    } else {
      tg.BackButton.onClick(() => navigate(-1))
    }
  }

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
