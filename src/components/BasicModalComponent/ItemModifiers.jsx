import React from 'react'
import { useDispatch } from 'react-redux'
import {
  addSupplement,
  removeSupplement,
} from '../../store/features/itemsSlice'

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

  const handleOptionChange = (drink) => {
    if (drink.amount === 1) {
      return
    }
    handleAddSupplement(drink)
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
        <div>
          <div
            className="drink-type"
            onClick={() => handleOptionChange(el, curItem.modifiers)}
          >
            <button className={`check ${el.amount === 1 ? 'checked' : ''}`}>
              {el.amount === 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemModifiers
