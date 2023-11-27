import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getAllMenu } from './store/features/itemsSlice'
import { useDispatch, useSelector } from 'react-redux'

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
    .map((item) => ({ ...item })) // Создаем новые объекты, чтобы не изменять исходные
    .sort(
      (first, second) =>
        categoryOrder.indexOf(first.category) -
        categoryOrder.indexOf(second.category)
    )

  const { totalPriceButton, tg } = useTelegram()
  useEffect(() => {
    tg.ready()
  }, [])
  const { price } = useSelector((state) => state.items)
  useEffect(() => {
    totalPriceButton()
  }, [price, window.location.pathname])

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <h2>Загразка...</h2>
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
  )
}

export default App
