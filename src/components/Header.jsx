import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import LOGO from '../image/logo.png'

const Header = () => {
  const [activeItem, setActiveItem] = useState('home')
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.endsWith('/payment')) {
      setActiveItem('payment')
    }
  }, [location.pathname])

  return (
    <header className="header">
      <div className={`header__logo ${activeItem === 'home' ? 'active' : ''}`}>
        <Link to="/" onClick={() => setActiveItem('home')}>
          <img src={LOGO} alt="" />
        </Link>
      </div>
      <div className="header__menu">
        <div className="menu">
          <div
            className={`menu__item ${activeItem === 'home' ? 'active' : ''}`}
          >
            <Link to="/" onClick={() => setActiveItem('home')}>
              <p>Главная</p>
            </Link>
          </div>

          <div
            className={`menu__item ${
              activeItem === 'sandwich' ? 'active' : ''
            }`}
          >
            <Link to="/sandwich" onClick={() => setActiveItem('sandwich')}>
              <p>Сендвичи</p>
            </Link>
          </div>
          <div
            className={`menu__item ${activeItem === 'burger' ? 'active' : ''}`}
          >
            <Link to="/burger" onClick={() => setActiveItem('burger')}>
              <p>Бургеры</p>
            </Link>
          </div>
          <div
            className={`menu__item ${activeItem === 'hot-dog' ? 'active' : ''}`}
          >
            <Link to="/hot-dog" onClick={() => setActiveItem('hot-dog')}>
              <p>Хот-Доги</p>
            </Link>
          </div>
          <div
            className={`menu__item ${activeItem === 'longer' ? 'active' : ''}`}
          >
            <Link to="/longer" onClick={() => setActiveItem('longer')}>
              <p>Лонегры</p>
            </Link>
          </div>
          <div
            className={`menu__item ${activeItem === 'potato' ? 'active' : ''}`}
          >
            <Link to="/potato" onClick={() => setActiveItem('potato')}>
              <p>Снэки</p>
            </Link>
          </div>
          <div
            className={`menu__item ${activeItem === 'sauces' ? 'active' : ''}`}
          >
            <Link to="/sauces" onClick={() => setActiveItem('sauces')}>
              <p>Соусы</p>
            </Link>
          </div>
          <div
            className={`menu__item ${activeItem === 'drinks' ? 'active' : ''}`}
          >
            <Link to="/drinks" onClick={() => setActiveItem('drinks')}>
              <p>Напитки</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
