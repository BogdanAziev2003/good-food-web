import React, { useState } from 'react'
import ItemDropdownContent from './Payment/ItemDropdownContent'

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
          <ItemDropdownContent
            additive={additive}
            items={items}
            kitcut={kitcut}
          />
        </div>
      )}
    </div>
  )
}

export default ViewDropdown
