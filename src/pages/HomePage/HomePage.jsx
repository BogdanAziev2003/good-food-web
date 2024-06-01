import React, { useEffect } from 'react';
import Item from '../../components/Item';

const HomePage = ({ item }) => {
  useEffect(() => {
    console.log(item);
  }, []);
  console.log(item);
  return (
    <div className="main">
      <div className="action">
        <h2 className="action__text">Акция</h2>
        <Item item={item.find((el) => el.id === 84)} />

        <Item item={item.find((el) => el.id === 1)} />
      </div>

      {item.map((el) => (
        <Item key={el.id} item={el} />
      ))}
    </div>
  );
};

export default HomePage;
