import React from 'react'
import Item from '../../components/Item'

const HotDogePage = ({ item }) => {
  return (
    <div className="main">
      {item.map((el) => (
        <Item key={el.id} item={el} />
      ))}
    </div>
  )
}

export default HotDogePage
