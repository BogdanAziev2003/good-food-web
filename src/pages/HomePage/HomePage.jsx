import React from 'react';
import Item from '../../components/Item';

const HomePage = ({ item }) => {
  return (
    <div className="main">
      <div className="action">
        <h2 className="action__text">Акция</h2>
        <Item item={item.find((el) => el.id === 113)} />
        <Item item={item.find((el) => el.id === 84)} />
        <Item item={item.find((el) => el.id === 1)} />
      </div>

      {item.map((el, id) => (
        <div key={id}>
          {el.id !== 84 && el.id !== 113 && el.id !== 1 ? (
            <Item item={el} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
