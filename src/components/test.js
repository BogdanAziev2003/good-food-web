import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addSupplement, removeSupplement } from '../store/features/itemsSlice'

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
}

export const BasicModal = React.memo(({ item }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dispatch = useDispatch()
  const { itemInCard } = useSelector((state) => state.items)
  let { supplements } = useSelector((state) => state.items)

  let idToRemoveSupp = []
  switch (item.category) {
    case 'burger':
      idToRemoveSupp = [3, 4, 5]
      supplements = supplements.filter(
        (supp) => !idToRemoveSupp.includes(supp.id)
      )
      break
    case 'sandwich':
      idToRemoveSupp = [2, 3, 4, 5]
      supplements = supplements.filter(
        (supp) => !idToRemoveSupp.includes(supp.id)
      )
      break

    case 'hot-dog':
      idToRemoveSupp = [2, 4, 5, 8, 10]
      supplements = supplements.filter(
        (supp) => !idToRemoveSupp.includes(supp.id)
      )
      break

    default:
      supplements = null
      break
  }

  const [curItem, setCurValue] = useState(item)

  const handleAddSupplement = (el) => {
    item = curItem
    console.log(item)
    dispatch(addSupplement({ el, item }))
  }

  const handleRemoveSupplement = (el) => {
    dispatch(removeSupplement({ el, item }))
  }

  const handleCurrentItemClick = (currItem) => {
    item = itemInCard.find((el) => el.idInCard === currItem.idInCard)
    setCurValue(item)
  }

  const lenElement = (currentItem) => {}

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
            <div className="modal__name">
              <div className="navigate-modal-btn">
                {itemInCard.map((itm, index) => {
                  if (itm.id === item.id) {
                    return (
                      <button
                        key={itm.idInCard}
                        onClick={() => handleCurrentItemClick(itm)}
                      >
                        {index + 1}
                      </button>
                    )
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
            {supplements.map((el) => (
              <div key={el.id} className="modal__item mod">
                <div className="mod__name">
                  <p>{el.name}</p>
                </div>
                <div className="mod__add">
                  {itemInCard.some(
                    (items) =>
                      items.id === item.id && items.additionally.includes(el)
                  ) ? (
                    <div className="mod__add-plus">
                      <button
                        onClick={() => {
                          handleAddSupplement(el)
                        }}
                      >
                        +
                      </button>
                      <p>
                        {lenElement()}
                        {
                          itemInCard
                            .find(
                              (currentItem) =>
                                currentItem.idInCard === item.idInCard
                            )
                            .additionally.filter(
                              (addItem) => addItem.id === el.id
                            ).length
                        }
                      </p>
                      <div className="mod__add-plus">
                        <button
                          onClick={() => {
                            handleRemoveSupplement(el)
                          }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mod__add-plus">
                      <button
                        onClick={() => {
                          handleAddSupplement(el)
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                  <div className="mod__add-price">
                    <p>{el.price} ₽</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  )
})

export default BasicModal
