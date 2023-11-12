import React from 'react'
import { Link } from 'react-router-dom'

import LOGO from '../image/logo.png'

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={LOGO} alt="" />
        </Link>
      </div>
      <div className="header__menu">
        <div className="menu">
          <div className="menu__item">
            <Link to="/">
              <p>Главная</p>
            </Link>
          </div>
          <div className="menu__item">
            <Link to="/sandwich">
              <p>Сендвичи</p>
            </Link>
          </div>
          <div className="menu__item">
            <Link to="/burger">
              <p>Бургеры</p>
            </Link>
          </div>
          <div className="menu__item hotdog">
            <Link to="/hot-dog">
              <p>Хот-Доги</p>
            </Link>
          </div>
          <div className="menu__item">
            <Link to="/potato">
              <p>Картошка</p>
            </Link>
          </div>
          <div className="menu__item">
            <Link to="/sauces">
              <p>Соусы</p>
            </Link>
          </div>
          <div className="menu__item">
            <Link to="/drinks">
              <p>Напитки</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
