import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setClientAddress,
  setSelectedOption,
} from '../../store/features/itemsSlice'
import Delivery from './Delivery'

const PaymentComponent = ({ addressError, setAddressError }) => {
  const dispatch = useDispatch()
  const { deliveryType } = useSelector((state) => state.items)

  const handleOptionChange = (deliveryType) => {
    dispatch(setSelectedOption(deliveryType))
    if (deliveryType === 'pickup') {
      dispatch(setClientAddress(null))
    }
  }

  return (
    <div className="delivery">
      <div className="delivery__text">
        <p>Спопосб получения заказа:</p>
      </div>
      <div className="delivery__types">
        <div
          className="delivery__type"
          onClick={() => handleOptionChange('pickup')}
        >
          <button
            className={`check ${deliveryType === 'pickup' ? 'checked' : ''}`}
          >
            {deliveryType === 'pickup' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            )}
          </button>
          <div className="delivery__description">
            <p>Самовывоз</p>
          </div>
        </div>
        <div
          className="delivery__type"
          onClick={() => handleOptionChange('delivery')}
        >
          <button
            className={`check ${deliveryType === 'delivery' ? 'checked' : ''}`}
          >
            {deliveryType === 'delivery' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            )}
          </button>
          <div className="delivery__description">
            <p>Доставка</p>
          </div>
        </div>
        {deliveryType === 'delivery' && (
          <Delivery
            addressError={addressError}
            setAddressError={setAddressError}
          />
        )}
      </div>
    </div>
  )
}

export default PaymentComponent

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="delivery">
      <p className="delivery__text">Выберите способ получения заказа:</p>
      <div className="delivery__types">
        <div className="delivery__type">
          <input
            className="check"
            type="radio"
            id="pickup"
            name="delivery"
            value="pickup"
            checked={deliveryType === 'pickup'}
            onChange={handleOptionChange}
          />
          <label htmlFor="pickup">Самовывоз</label>
        </div>
        <div className="delivery__type">
          <input
            className="check"
            type="radio"
            id="delivery"
            name="delivery"
            value="delivery"
            checked={deliveryType === 'delivery'}
            onChange={handleOptionChange}
          />
          <label htmlFor="delivery">Доставка</label>
        </div>
        {deliveryType === 'delivery' && (
          <>
            <Delivery />
          </>
        )}
      </div>
    </div> */
}
