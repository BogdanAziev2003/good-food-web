import React from 'react'

const NavigateItemModal = ({
  item,
  activeItem,
  itemInCard,
  setCurValue,
  setActiveItem,
  setIsActiveSnack,
  setIsActiveSause,
}) => {
  let count = 1

  const handleCurrentItemClick = (currItem) => {
    item = itemInCard.find((el) => el.idInCard === currItem.idInCard)
    setCurValue(item)
    setActiveItem(item)
    setIsActiveSnack(false)
    setIsActiveSause(false)
  }

  return (
    <div className="modal__header-wrapper">
      <div className="navigate-modal-btn-list">
        {itemInCard.map((itm) => {
          if (itm.id === item.id) {
            return (
              <button
                className={`navigate-modal-btn ${
                  activeItem.idInCard === itm.idInCard ? 'active' : ''
                }`}
                key={itm.idInCard}
                onClick={() => handleCurrentItemClick(itm)}
              >
                {count++}
              </button>
            )
          }
        })}
      </div>
    </div>
  )
}

export default NavigateItemModal
