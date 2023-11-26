import React, { useState } from 'react'

let ViewDropdown = ({ items, additive = null }) => {
  const [isActive, setIsActive] = useState(false)

  function kitcut(text, limit) {
    text = text.trim()
    if (text.length <= limit) return text
    text = text.slice(0, limit) // тупо отрезать по лимиту
    let lastSpace = text.lastIndexOf(' ')
    if (lastSpace > 0) {
      // нашлась граница слов, ещё укорачиваем
      text = text.substr(0, lastSpace)
    }
    return text + '...'
  }

  return (
    <div
      className={`view-dropdown dropdown ${isActive && 'view-dropdown-active'}`}
    >
      <div
        className="dropdown-btn"
        onClick={(e) => {
          setIsActive(!isActive)
        }}
      >
        <p>Добавки</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {additive &&
            additive.map((add) => {
              return (
                <div className="dropdown-item dropdown-item-addictive">
                  {add}
                </div>
              )
            })}
          {items.map((item) => {
            if (item.amount !== 0) {
              return (
                <div className="dropdown-item">
                  {kitcut(item.title, 10)} x {item.amount}
                </div>
              )
            } else {
              return <></>
            }
          })}
        </div>
      )}
    </div>
  )
}

export default ViewDropdown
