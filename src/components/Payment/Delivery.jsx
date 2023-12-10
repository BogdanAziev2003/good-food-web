import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setClientAddress } from '../../store/features/itemsSlice'

const Delivery = ({ addressError, setAddressError }) => {
  const dispatch = useDispatch()

  const addressFromStore = useSelector((state) => state.items.address)
  const [address, setAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [deliveryCost, setDeliveryCost] = useState(0)

  const handleAddressChange = (event) => {
    setAddressError(false)
    setAddress(event.target.value)
  }

  const handlerAddressSend = async (address) => {
    setAddressError(false)
    if (address !== '') {
      try {
        const cafeCoordinates = { lat: 43.18992, lon: 44.53752 }
        const userCoordinates = await getCoordinatesForAddress(address)

        const distance = await calculateDistance(
          cafeCoordinates,
          userCoordinates
        )
        console.log('Дистанция:' + distance.toFixed(3))

        const cost = calculateDeliveryCost(distance)
        setDeliveryCost(cost)
        console.log('Стоимость доставки: ' + cost.toFixed(0))

        dispatch(setClientAddress(address))
        setErrorMessage(false)
      } catch (error) {
        console.error('Error calculating distance:', error)
        setErrorMessage('Error calculating distance')
      }
    } else {
      setErrorMessage('Введите адрес доставки')
    }
  }

  const getCoordinatesForAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json&limit=1`
    )
    const data = await response.json()

    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      }
    } else {
      throw new Error('Address not found')
    }
  }

  const calculateDistance = async (startCoordinates, endCoordinates) => {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${startCoordinates.lon},${startCoordinates.lat};${endCoordinates.lon},${endCoordinates.lat}?overview=false`
    )
    const data = await response.json()

    if (data.routes && data.routes.length > 0) {
      return data.routes[0].distance / 1000
    } else {
      throw new Error('Error calculating distance')
    }
  }

  const calculateDeliveryCost = (distance) => {
    const baseCost = 70
    const costPerKm = 6 // * km
    return baseCost + distance * costPerKm
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
      <div className="address_error">{errorMessage ? errorMessage : <></>}</div>
      <div className="address_error">
        {addressError && !errorMessage && (
          <p className="address_error">Введите адрес доставки</p>
        )}
      </div>
      <div className="delivery_cost">
        {deliveryCost > 0 && deliveryCost < 1000 && (
          <p className="delivery_cost">
            Стоимость доставки: {deliveryCost.toFixed(0)}
          </p>
        )}
      </div>
    </div>
  )
}

export default Delivery
