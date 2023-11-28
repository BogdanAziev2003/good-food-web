import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addSupplement, removeSupplement } from '../store/features/itemsSlice'
import Dropdown from './Dropdown'

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
  border: '4px solid red',
}

export const BasicModal = React.memo(({ item }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  let count = 1
  const [activeItem, setActiveItem] = useState(item)
  const { itemInCard } = useSelector((state) => state.items)
  const [curItem, setCurValue] = useState(item)
  const snacks = ['Фри', 'По деревенски']
  const sause = ['Кетчуп', 'Кисло-сладкий', 'Сальса', 'Сырный', 'Чесночный']
  const [selectedSnack, setSelectedSnack] = useState()
  const [selectedSause, setSelectedSause] = useState()
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

  const handleCurrentItemClick = (currItem) => {
    item = itemInCard.find((el) => el.idInCard === currItem.idInCard)
    setCurValue(item)
    setActiveItem(item)
  }

  // useEffect(() => {
  //   console.log(itemInCard)
  // }, [itemInCard])

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
                  } else {
                    return <></>
                  }
                })}
              </div>
            </div>

            <div className="modal__close" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
          </div>
          <div className="modal__body">
            {curItem?.category === 'Сэндвичи' && (
              <>
                <div className="mod">
                  <div className="mod__name">
                    <p>Снэки на выбор</p>
                  </div>
                  <div
                    onClick={() => {
                      setIsActiveSnack(true)
                      setIsActiveSause(false)
                    }}
                  >
                    <Dropdown
                      items={snacks}
                      selected={curItem.snack}
                      setSelected={setSelectedSnack}
                      curItem={curItem}
                      isActiveDrop={isActiveSnack}
                    />
                  </div>
                </div>

                <div className="mod">
                  <div className="mod__name">
                    <p>Соус на выбор</p>
                  </div>
                  <div
                    onClick={() => {
                      setIsActiveSnack(false)
                      setIsActiveSause(true)
                    }}
                  >
                    <Dropdown
                      items={sause}
                      selected={curItem.sause}
                      setSelected={setSelectedSause}
                      curItem={curItem}
                      isActiveDrop={isActiveSause}
                    />
                  </div>
                </div>
              </>
            )}

            {curItem?.modifiers.map((el) => (
              <div key={el.id} className="modal__item mod">
                <div className="mod__name">
                  <p>{el.title}</p>
                </div>

                {el.amount !== 0 ? (
                  <div className="mod__add mod__add_active">
                    <button
                      className="mod__add-btn"
                      onClick={() => {
                        handleAddSupplement(el)
                      }}
                    >
                      +
                    </button>
                    <p>{el.amount}</p>
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
