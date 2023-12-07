import React, { useState } from 'react'
import Dropdown from '../Dropdown'

const SandwichDropdown = ({
  curItem,
  isActiveSnack,
  isActiveSause,
  setIsActiveSnack,
  setIsActiveSause,
  closeModal,
}) => {
  const snacks = ['Фри', 'По деревенски']
  const sause = ['Кетчуп', 'Кисло-сладкий', 'Сальса', 'Сырный', 'Чесночный']
  const [selectedSnack, setSelectedSnack] = useState()
  const [selectedSause, setSelectedSause] = useState()
  return (
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
            closeModal={closeModal}
            setIsActiveSnack={setIsActiveSnack}
            setIsActiveSause={setIsActiveSause}
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
            closeModal={closeModal}
            setIsActiveSnack={setIsActiveSnack}
            setIsActiveSause={setIsActiveSause}
          />
        </div>
      </div>
    </>
  )
}

export default SandwichDropdown
