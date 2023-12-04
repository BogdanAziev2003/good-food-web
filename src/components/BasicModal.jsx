import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addSupplement, removeSupplement } from '../store/features/itemsSlice'
import CloseModalBtn from './BasicModalComponent/CloseModalBtn'
import NavigateItemModal from './BasicModalComponent/NavigateItemModal'
import SandwichDropdown from './BasicModalComponent/SandwichDropdown'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 40px)',
  height: 'max-content',
  padding: '0px 20px 20px 20px',
  bgcolor: '#33312d',
  borderRadius: '15px',
  outline: '0',
}

export const BasicModal = React.memo(({ item }) => {
  const [closeModal, setCloseModal] = useState(false)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setCloseModal(true)
    setOpen(true)
  }
  const handleClose = () => {
    setCloseModal(false)
    setOpen(false)
  }

  const [activeItem, setActiveItem] = useState(item)
  const { itemInCard } = useSelector((state) => state.items)
  const [curItem, setCurValue] = useState(item)
  const [isActiveSnack, setIsActiveSnack] = useState(false)
  const [isActiveSause, setIsActiveSause] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const updateItem = itemInCard.find(
      (el) => curItem?.idInCard === el.idInCard
    )
    if (!curItem) {
      setCurValue(item)
      setActiveItem(item)
    } else {
      setCurValue(updateItem)
    }
  }, [itemInCard, curItem, item, setActiveItem])

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
    <div>
      <button className="button" onClick={handleOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M240-500v-220h220v220H240Zm0 260v-220h220v220H240Zm260-260v-220h220v220H500Zm0 260v-220h220v220H500ZM320-580h60v-60h-60v60Zm260 0h60v-60h-60v60ZM320-320h60v-60h-60v60Zm260 0h60v-60h-60v60ZM380-580Zm200 0Zm0 200Zm-200 0ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
        </svg>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal__header">
            <NavigateItemModal // Навигация По Модальному Окну
              item={item}
              activeItem={activeItem}
              itemInCard={itemInCard}
              setCurValue={setCurValue}
              setActiveItem={setActiveItem}
              setIsActiveSnack={setIsActiveSnack}
              setIsActiveSause={setIsActiveSause}
            />

            <CloseModalBtn handleClose={handleClose} />
          </div>
          <div className="modal__body">
            {curItem?.category === 'Сэндвичи' && (
              <SandwichDropdown
                curItem={curItem}
                isActiveSnack={isActiveSnack}
                isActiveSause={isActiveSause}
                setIsActiveSnack={setIsActiveSnack}
                setIsActiveSause={setIsActiveSause}
                closeModal={closeModal}
              />
            )}

            {curItem?.modifiers.map((el) => (
              <div key={el.id} className="modal__item mod">
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
                      <button
                        className={`check ${el.amount === 1 ? 'checked' : ''}`}
                      >
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
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  )
})

export default BasicModal
