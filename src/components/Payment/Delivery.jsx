import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setClientAddress } from '../../store/features/itemsSlice'
import DelMap from './DelMap'

const Delivery = ({ addressError, setAddressError }) => {
  const dispatch = useDispatch()

  const addressFromStore = useSelector((state) => state.items.address)
  const { deliveryPrice } = useSelector((state) => state.items)
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
      <p className="address__text">Выберите адресс доставки:</p>
      {addressFromStore ? (
        <>
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
          {deliveryPrice && (
            <div className="address__text-done">
              <p>
                Цена доставки:
                <span className="delivery-price"> {deliveryPrice}</span> ₽
              </p>
            </div>
          )}
        </>
      ) : (
        <DelMap handlerAddressSend={handlerAddressSend} />
      )}
    </div>
  )
}

export default Delivery
