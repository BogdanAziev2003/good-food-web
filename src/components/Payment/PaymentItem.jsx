import React from 'react'
import ViewDropdown from '../ViewDropdown'

const PaymentItem = ({ item }) => {
  return (
    <div className="item">
      <div className="item__image">
        <img
          src={'http://94.241.141.165:8080/api/menu/image/' + item.imageurl}
          alt=""
        />
      </div>
      <div className="item__info">
        <div className="item__block">
          <div className="item__name">
            <p>{item.title}</p>
          </div>
          <div className="item__amount">
            <p>Кол-во: {item ? item.count : 1}</p>
          </div>
          <div className="item__price">
            <p>Цена: {item.price}₽</p>
          </div>
        </div>

        <div className="item__supplements">
          {(item.modifiers.some((modifier) => modifier.amount !== 0) ||
            item.category === 'Сэндвичи') && (
            <ViewDropdown
              // eslint-disable-next-line array-callback-return
              items={item.modifiers}
              additive={[item.sause, item.snack]}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentItem
