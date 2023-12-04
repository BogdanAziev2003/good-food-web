import React from 'react'
import { useDispatch } from 'react-redux'
import {
  addSupplement,
  removeSupplement,
} from '../../../store/features/itemsSlice'
import DrinkModifiers from './DrinkModifiers'
import Modifiers from './Modifiers'

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
        <Modifiers
          el={el}
          handleAddSupplement={handleAddSupplement}
          handleRemoveSupplement={handleRemoveSupplement}
        />
      ) : (
        // Если напитки
        <DrinkModifiers
          el={el}
          curItem={curItem}
          handleAddSupplement={handleAddSupplement}
        />
      )}
    </div>
  )
}

export default ItemModifiers
