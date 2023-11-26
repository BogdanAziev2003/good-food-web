import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setClientAddress } from '../../store/features/itemsSlice'

const Delivery = () => {
  const dispatch = useDispatch()

  const addressFromStore = useSelector((state) => state.items.address) // address from store

  const [address, setAddress] = useState('') // adress set To store

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  const handlerAddressSend = (address) => {
    dispatch(setClientAddress(address))
  }
  return (
    <div className="address">
      <p className="address__text">Адрес доставки:</p>
      {addressFromStore === null ? (
        <div className="address__block">
          <div className="address__input">
            <input
              className="paymant-input"
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div>
            <button
              className="btn"
              onClick={() => {
                handlerAddressSend(address)
              }}
            >
              Подтвердить
            </button>
          </div>
        </div>
      ) : (
        <div className="address__block">
          <div className="address__input address__text-done">
            {addressFromStore}
          </div>
          <button
            className="btn"
            onClick={() => {
              handlerAddressSend(null)
            }}
          >
            Изменить
          </button>
        </div>
      )}
    </div>
  )
}

export default Delivery
