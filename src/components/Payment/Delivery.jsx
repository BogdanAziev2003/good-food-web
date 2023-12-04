import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setClientAddress } from '../../store/features/itemsSlice'

const Delivery = ({ addressError, setAddressError }) => {
  const dispatch = useDispatch()

  const addressFromStore = useSelector((state) => state.items.address)
  const [address, setAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  const handleAddressChange = (event) => {
    setAddressError(false)
    setAddress(event.target.value)
  }

  const handlerAddressSend = (address) => {
    setAddressError(false)
    if (address !== '') {
      dispatch(setClientAddress(address))
      setErrorMessage(false)
    } else {
      setErrorMessage('Введите адресс доставки')
    }
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
              Подтвердить {addressError === false ? 'false' : 'true'}
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
      <div className="address_error">{errorMessage ? errorMessage : <></>}</div>
      <div className="address_error">
        {addressError && <p className="address_error">{errorMessage}</p>}
      </div>
    </div>
  )
}

export default Delivery
