import React from 'react'
import ViewDropdown from '../ViewDropdown'

const PaymentItem = ({ item }) => {
  return (
    <div className="item">
      <div className="item__image">
        <img
          src={'https://server.tg-delivery.ru/api/menu/image/' + item.imageurl}
          alt=""
        />
      </div>
      <div className="item__info">
        <div className="item__block">
          <div className="item__name">
            {item.category !== 'Напитки' ? (
              <p>{item.title}</p>
            ) : (
              <>
                {item.modifiers.find((m) => m.amount === 1) ? (
                  <p>{item.modifiers.find((m) => m.amount === 1).title}</p>
                ) : (
                  <p>{item.title}</p>
                )}
              </>
            )}
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
            item.category === 'Сэндвичи') &&
            item.category !== 'Напитки' && (
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
