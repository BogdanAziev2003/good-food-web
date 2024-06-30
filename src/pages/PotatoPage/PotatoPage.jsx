import React from 'react';
import Item from '../../components/Item';

const PotatoPage = ({ item }) => {
  const sortedItems = item.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

  return (
    <div className="main">
      {sortedItems.map((el) => (
        <Item key={el.id} item={el} />
      ))}
    </div>
  );
};

export default PotatoPage;
