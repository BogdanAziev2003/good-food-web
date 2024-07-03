import React, { useEffect, useState } from 'react';
import Dropdown from '../Dropdown';
import { useSelector } from 'react-redux';

const SandwichDropdown = ({
  curItem,
  isActiveSnack,
  isActiveSause,
  setIsActiveSnack,
  setIsActiveSause,
  closeModal,
}) => {
  const { items } = useSelector((state) => state.items);
  const snacks = items
    .filter(
      (item) =>
        item.title === 'Картофель по деревенски 200 гр.' ||
        item.title === 'Картофель Фри 200 гр.'
    )
    .map((item) => {
      if (item.title === 'Картофель по деревенски 200 гр.')
        return 'По деревенски';
      if (item.title === 'Картофель Фри 200 гр.') return 'Фри';
      return item.title;
    });
  const sause = items
    .filter((item) => item.category === 'Соусы')
    .map((item) => item.title);

  const [selectedSnack, setSelectedSnack] = useState();
  const [selectedSause, setSelectedSause] = useState();

  return (
    <>
      {curItem.id !== 1 && curItem.id !== 84 && (
        <div className="mod">
          <div className="mod__name">
            <p>Снэки на выбор</p>
          </div>
          <div
            onClick={() => {
              setIsActiveSnack(true);
              setIsActiveSause(false);
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
      )}

      <div className="mod">
        <div className="mod__name">
          <p>Соус на выбор</p>
        </div>
        <div
          onClick={() => {
            setIsActiveSause(true);
            setIsActiveSnack(false);
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
  );
};

export default SandwichDropdown;
