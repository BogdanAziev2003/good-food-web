import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../store/features/itemsSlice'
import BasicModal from './BasicModal'

const Item = React.memo(({ item }) => {
  const dispatch = useDispatch()
  const { itemInCard } = useSelector((state) => state.items)

  const handleAddToCart = (item) => {
    if (item.category !== 'Напитки') {
      dispatch(addItem(item))
    } else {
      if (item.modifiers.length > 0) {
        item = {
          ...item,
          modifiers: [
            {
              ...item.modifiers[0],
              amount: 1,
            },
            ...item.modifiers.slice(1),
          ],
        }
      }
      dispatch(addItem(item))
    }
  }

  const handleRemoveToCart = (item) => {
    const item_id = item.id
    dispatch(removeItem(item))
    item = itemInCard.find((el) => el.id === item_id)
  }

  return (
    <div className="item">
      <div className="item__photo">
        <img
          src={'https://server.tg-delivery.ru/api/menu/image/' + item.imageurl}
          alt=""
        />
      </div>
      <div className="item__info">
        <div className="item__info-block">
          <div className="item__name">
            <p>{item.title}</p>
          </div>
          <div className="item__description">
            <p>{item.contains + ''}</p>
          </div>
        </div>

        {itemInCard.some((el) => el.id === item.id) ? (
          <div className="item__add item__add_click">
            <div className="item__add-block">
              <div className="item__add-plus item__add-btn">
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
              <div className="item__add-minus item__add-btn">
                <p onClick={() => handleRemoveToCart(item)}>-</p>
              </div>
            </div>
            <div className="item__add-modifier">
              {item.modifiers.length > 0 ? (
                <BasicModal item={itemInCard.find((el) => el.id === item.id)} />
              ) : (
                ''
              )}
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
                <p>{item.price}₽</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default Item
