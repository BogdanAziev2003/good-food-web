import React, { useEffect, useState } from 'react'
import { addSause, addSnack } from '../store/features/itemsSlice'
import { useDispatch } from 'react-redux'

const Dropdown = ({ selected, setSelected, items, curItem, isActiveDrop }) => {
  useEffect(() => {}, [isActiveDrop])
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(isActiveDrop)

  const handleAddSnack = (snack) => {
    setSelected(snack)
    setIsActive(false)
    if (items.length === 2) {
      dispatch(addSnack({ snack, curItem }))
    } else {
      dispatch(addSause({ snack, curItem }))
    }
  }

  useEffect(() => {
    setIsActive(isActiveDrop)
  }, [isActiveDrop])

  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => {
          setIsActive(!isActive)
        }}
      >
        <p>{selected}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </div>
      {isActive && isActiveDrop && (
        <div className="dropdown-content">
          {items.map((item, id) => (
            <div
              key={id}
              onClick={() => {
                handleAddSnack(item)
              }}
              className="dropdown-item"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
