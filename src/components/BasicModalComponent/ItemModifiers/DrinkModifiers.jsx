import React from 'react'

const ItemDrink = ({ el, curItem, handleAddSupplement }) => {
  const handleOptionChange = (drink) => {
    if (drink.amount === 1) {
      return
    }
    handleAddSupplement(drink)
  }
  return (
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
  )
}

export default ItemDrink
