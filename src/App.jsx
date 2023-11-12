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

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllMenu())
  }, [dispatch])

  const { items } = useSelector((state) => state.items)
  return (
    <div>
      <div className="wrapper">
        <Layaout>
          <Routes>
            <Route>
              <Route path="/" element={<HomePage item={items} />} />
              <Route
                path="/sandwich"
                element={
                  <SandwichPage
                    item={items.filter((el) => el.category === 'sandwich')}
                  />
                }
              />
              <Route
                path="/burger"
                element={
                  <BurgerPage
                    item={items.filter((el) => el.category === 'burger')}
                  />
                }
              />
              <Route
                path="/hot-dog"
                element={
                  <HotDogePage
                    item={items.filter((el) => el.category === 'hot-dog')}
                  />
                }
              />
              <Route
                path="/potato"
                element={
                  <PotatoPage
                    item={items.filter((el) => el.category === 'snacks')}
                  />
                }
              />
              <Route
                path="/sauces"
                element={
                  <SaucesPage
                    item={items.filter((el) => el.category === 'sauces')}
                  />
                }
              />
              <Route
                path="/drinks"
                element={
                  <DrinksPage
                    item={items.filter((el) => el.category === 'drinks')}
                  />
                }
              />
            </Route>
          </Routes>
        </Layaout>
      </div>
    </div>
  )
}

export default App
