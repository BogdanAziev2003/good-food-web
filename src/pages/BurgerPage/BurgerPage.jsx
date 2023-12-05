import React from 'react'
import Item from '../../components/Item'
import DiscountComponent from '../../components/DiscountComponent'

const BurgerPage = ({ item }) => {
  return (
    <div className="main">
      <DiscountComponent />

      {item.map((el) => (
        <Item key={el.id} item={el} />
      ))}
    </div>
  )
}

export default BurgerPage
