import React from 'react'

const Modifiers = ({ el, handleAddSupplement, handleRemoveSupplement }) => {
  return el.amount !== 0 ? (
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
}

export default Modifiers
