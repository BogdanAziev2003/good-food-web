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
  try {
    tg.backgroundColor = '#2b2a28'
    tg.headerColor = '#2b2a28'
  } catch (error) {}

  Telegram.WebApp.onEvent('mainButtonClicked', () => {
    if (tg.MainButton.text === `Мой заказ: ${price} ₽`) navigate('/payment')
  })

  if (window.location.pathname === '/') {
    tg.BackButton.hide()
  } else if (window.location.pathname === '/payment') {
    tg.BackButton.show()
    Telegram.WebApp.onEvent('backButtonClicked', () => {
      navigate('/', { replace: false })
    })
  } else {
    tg.BackButton.show()
    Telegram.WebApp.onEvent('backButtonClicked', () => {
      window.history.back()
    })
  }

  const totalPriceButton = () => {
    if (window.location.pathname !== '/payment' && price !== 0) {
      tg.MainButton.show()
      tg.MainButton.text = `Мой заказ: ${price} ₽`
    }
    if (window.location.pathname === '/payment' && price !== 0) {
      tg.MainButton.text = `Заказать: ${price} ₽`
    } else if (price === 0) {
      tg.MainButton.hide()
    }
  }

  return {
    totalPriceButton,
    tg,
  }
}
