import React from 'react'

const ItemDropdownContent = ({ additive, items, kitcut }) => {
  return (
    <>
      {items.map((item, id) => {
        if (item.amount !== 0) {
          return (
            <div key={id} className="dropdown-item">
              {kitcut(item.title, 10)} x {item.amount}
            </div>
          )
        }
      })}
      {additive &&
        additive.map((add, id) => {
          if (add) {
            return (
              <div key={id} className="dropdown-item dropdown-item-addictive">
                {add}
              </div>
            )
          }
        })}
    </>
  )
}

export default ItemDropdownContent
