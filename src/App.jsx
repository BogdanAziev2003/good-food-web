import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getAllMenu } from './store/features/itemsSlice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment-timezone'

import Layaout from './components/Layaout'
import HomePage from './pages/HomePage/HomePage'
import SandwichPage from './pages/SandwichPage/SandwichPage'
import BurgerPage from './pages/BurgerPage/BurgerPage'
import HotDogePage from './pages/HotDogePage/HotDogePage'
import PotatoPage from './pages/PotatoPage/PotatoPage'
import DrinksPage from './pages/DrinksPage/DrinksPage'
import SaucesPage from './pages/SaucesPage/SaucesPage'
import Payment from './pages/PaymentPage/Payment'

import { useTelegram } from './hooks/useTelegram'

const App = () => {
  const dispatch = useDispatch()

  const [cafeIsOpen, setCafeOpen] = useState(false)
  const localTimestamp = moment.tz('Europe/Moscow')
  const currentTime = localTimestamp.format('HH:mm')

  useEffect(() => {
    if (currentTime >= '10:00' && currentTime <= '21:50') {
      setCafeOpen(true)
    } else {
      setCafeOpen(true)
    }
  }, [])

  let { items, isLoading } = useSelector((state) => state.items)

  useEffect(() => {
    dispatch(getAllMenu())
  }, [dispatch])

  const categoryOrder = [
    'Бургеры',
    'Хот-доги',
    'Сэндвичи',
    'Лонгеры',
    'Снэки',
    'Соусы',
    'Напитки',
  ]

  items = items
    .map((item) => ({ ...item }))
    .sort(
      (first, second) =>
        categoryOrder.indexOf(first.category) -
        categoryOrder.indexOf(second.category)
    )
  // Актуальный соус
  items = items.map((item) => {
    if (item.category === 'Сэндвичи' && !item.title.includes('mini')) {
      const sauceItem = items.find((item) => item.category === 'Соусы')
      if (sauceItem) {
        return { ...item, sause: sauceItem.title }
      }
    }
    return item
  })
  // Актуальный Snack
  if (
    items.findIndex((item) => item.id === 29) === -1 &&
    items.findIndex((item) => item.id === 31) !== -1
  ) {
    items = items.map((item) => {
      if (item.category === 'Сэндвичи' && !item.title.includes('mini')) {
        return { ...item, snack: 'По деревенски' }
      }
      return item
    })
  } else if (
    items.findIndex((item) => item.id === 31) === -1 &&
    items.findIndex((item) => item.id === 29) !== -1
  ) {
    items = items.map((item) => {
      if (item.category === 'Сэндвичи' && !item.title.includes('mini')) {
        return { ...item, snack: 'Фри' }
      }
      return item
    })
  } else if (
    items.findIndex((item) => item.id === 29) === -1 &&
    items.findIndex((item) => item.id === 31) === -1
  ) {
    items = items.map((item) => {
      if (item.category === 'Сэндвичи') {
        delete item.snack
      }
      return item
    })
  }

  const { totalPriceButton, tg } = useTelegram()
  useEffect(() => {
    tg.ready()
  }, [])
  const { price } = useSelector((state) => state.items)
  useEffect(() => {
    totalPriceButton()
  }, [price, window.location.pathname])

  return (
    <>
      {cafeIsOpen ? (
        <div>
          {isLoading ? (
            <div className="loading">
              <h2>Загрузка...</h2>
            </div>
          ) : (
            <div className="wrapper">
              <Layaout>
                <Routes>
                  <Route path="/" element={<HomePage item={items} />} />
                  <Route
                    path="/sandwich"
                    element={
                      <SandwichPage
                        item={items.filter((el) => el.category === 'Сэндвичи')}
                      />
                    }
                  />
                  <Route
                    path="/burger"
                    element={
                      <BurgerPage
                        item={items.filter((el) => el.category === 'Бургеры')}
                      />
                    }
                  />
                  <Route
                    path="/hot-dog"
                    element={
                      <HotDogePage
                        item={items.filter((el) => el.category === 'Хот-доги')}
                      />
                    }
                  />
                  <Route
                    path="/longer"
                    element={
                      <HotDogePage
                        item={items.filter((el) => el.category === 'Лонгеры')}
                      />
                    }
                  />
                  <Route
                    path="/potato"
                    element={
                      <PotatoPage
                        item={items.filter((el) => el.category === 'Снэки')}
                      />
                    }
                  />
                  <Route
                    path="/sauces"
                    element={
                      <SaucesPage
                        item={items.filter((el) => el.category === 'Соусы')}
                      />
                    }
                  />
                  <Route
                    path="/drinks"
                    element={
                      <DrinksPage
                        item={items.filter((el) => el.category === 'Напитки')}
                      />
                    }
                  />
                  <Route path="/payment" element={<Payment />} />
                </Routes>
              </Layaout>
            </div>
          )}
        </div>
      ) : (
        <div className="loading">
          <h2>Кафе Закрыто 😊</h2>
          <h6>10.00 - 21.50</h6>
        </div>
      )}
    </>
  )
}

export default App
