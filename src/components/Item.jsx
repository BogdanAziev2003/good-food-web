import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { addItem, removeItem } from '../store/features/itemsSlice'

const Item = ({ item }) => {
  const dispatch = useDispatch()

  const { itemInCard } = useSelector((state) => state.items)

  const handleAddToCart = (item) => {
    dispatch(addItem(item))
  }

  const handleRemoveToCart = (item) => {
    dispatch(removeItem(item))
  }

  return (
    <div className="item">
      <div className="item__photo">
        <img src={'img/' + item.image} alt="" />
      </div>
      <div className="item__info">
        <div className="item__info-block">
          <div className="item__name">
            <p>{item.name}</p>
          </div>
          <div className="item__description">
            <p>
              <i>{item.contains + ''}</i>
            </p>
          </div>
        </div>

        {itemInCard.includes(item) ? (
          <div className="item__add item__add_click">
            <div className="item__add-block">
              <div className="item__add-plus">
                <p onClick={() => handleAddToCart(item)}>+</p>
              </div>
              <div className="item__add-amount">
                <p>
                  {
                    itemInCard.filter((position) => position.id === item.id)
                      .length
                  }
                </p>
              </div>
              <div className="item__add-minus">
                <p onClick={() => handleRemoveToCart(item)}>-</p>
              </div>
            </div>
            <div className="item__add-modifier">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M240-500v-220h220v220H240Zm0 260v-220h220v220H240Zm260-260v-220h220v220H500Zm0 260v-220h220v220H500ZM320-580h60v-60h-60v60Zm260 0h60v-60h-60v60ZM320-320h60v-60h-60v60Zm260 0h60v-60h-60v60ZM380-580Zm200 0Zm0 200Zm-200 0ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="item__add">
            <div
              className="item__add-block"
              onClick={() => handleAddToCart(item)}
            >
              <div className="item__add-plus">
                <p>+</p>
              </div>
              <div className="item__add-price">
                <p>{item.price} ₽</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Item
