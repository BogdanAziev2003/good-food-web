import React from 'react'
import { useDispatch } from 'react-redux'
import {
  addSupplement,
  removeSupplement,
} from '../../../store/features/itemsSlice'
import ItemDrink from './ItemDrink'

const ItemModifiers = ({ el, item, curItem, itemInCard, setCurValue }) => {
  const dispatch = useDispatch()

  const handleAddSupplement = (el) => {
    item = curItem
    dispatch(addSupplement({ el, item }))
    item = itemInCard.find((el) => el.idInCard === curItem.idInCard)
    setCurValue(item)
  }

  const handleRemoveSupplement = (el) => {
    item = curItem
    dispatch(removeSupplement({ el, item }))
  }

  return (
    <div className="modal__item mod">
      <div className="mod__name">
        <p>{el.title}</p>
      </div>

      {curItem.category !== 'Напитки' ? (
        el.amount !== 0 ? (
          <div className="mod__add mod__add_active">
            <button
              className="mod__add-btn"
              onClick={() => {
                handleAddSupplement(el)
              }}
            >
              +
            </button>
            <p className="mod__el__amount">{el.amount}</p>
            <button
              className="mod__add-btn mod__add-btn-minus"
              onClick={() => {
                handleRemoveSupplement(el)
              }}
            >
              -
            </button>
          </div>
        ) : (
          <div
            className="mod__add"
            onClick={() => {
              handleAddSupplement(el)
            }}
          >
            <div className="mod__add-plus">
              <p>+</p>
            </div>

            <div className="mod__add-price">
              <p>{el.price}₽</p>
            </div>
          </div>
        )
      ) : (
        // Если напитки
        <ItemDrink
          el={el}
          curItem={curItem}
          handleAddSupplement={handleAddSupplement}
        />
      )}
    </div>
  )
}

export default ItemModifiers
