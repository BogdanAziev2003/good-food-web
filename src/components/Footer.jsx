import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Footer = (props) => {
  const { price } = useSelector((state) => state.items)

  return (
    <div className="footer">
      <Link to={'/payment'} className="footer-navigate">
        <button>Мой заказ: {price} ₽</button>
      </Link>
    </div>
  )
}

export default Footer
