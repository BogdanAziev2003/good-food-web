import { useSelector } from 'react-redux'
import { useNavigate, useHistory } from 'react-router-dom'

export function useTelegram() {
  const navigate = useNavigate()
  const history = useHistory()

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
    if (tg.MainButton.text === `Мой заказ: ${price} ₽`) {
      history.push('/payment')
    }
  })

  if (window.location.pathname === '/') {
    tg.BackButton.hide()
  }
  // else if (window.location.pathname === '/payment') {
  //   Telegram.WebApp.onEvent('backButtonClicked', () => {
  //     navigate('/')
  //   })
  // }
  else {
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
