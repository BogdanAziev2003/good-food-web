import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPhoneOption } from '../../store/features/itemsSlice'

const Phone = ({ phoneError }) => {
  const dispatch = useDispatch()
  const { phone } = useSelector((state) => state.items)

  useEffect(() => {
    phoneError = phoneError
  }, [])

  const [phoneValue, setPhone] = useState('+7')
  const [errorMessage, setErrorMessage] = useState(false)
  const handlerPhoneChange = (event) => {
    if (!event.target.value.startsWith('+7')) {
      event.target.value = '+7' + event.target.value.substring(2)
    }
    if (event.target.value.length > 12) {
      event.target.value = event.target.value.slice(0, 12)
    }
    setPhone(event.target.value)
  }

  const handlerPhoneSend = (phone) => {
    if (phone.length === 12) {
      dispatch(setPhoneOption(phone))
      setPhone('')
      setErrorMessage(false)
    } else {
      setErrorMessage('Некорректный номер телефона')
    }
  }

  const hendlerPhoneClear = () => {
    dispatch(setPhoneOption(null))
  }

  return (
    <div className="phone">
      {phone !== null ? (
        <>
          <div className="phone__text">
            <p>Ваш номер телефона:</p>
          </div>
          <div className="phone__block">
            <div className="phone__input phone__text-done">
              {'+7 ' +
                phone.slice(2, 5) +
                ' ' +
                phone.slice(5, 8) +
                ' ' +
                phone.slice(8, 10) +
                ' ' +
                phone.slice(10, 12)}
            </div>
            <button
              className="btn"
              onClick={() => {
                hendlerPhoneClear()
                setPhone('+7')
              }}
            >
              Изменить
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="phone__text">
            <p>Введите номер телефона:</p>
          </div>
          <div className="phone__block">
            <div className="phone__input">
              <input
                type="text"
                value={phoneValue}
                onChange={handlerPhoneChange}
                name="phone"
                id="phone"
                inputMode="numeric"
              />
            </div>
            <button
              className="btn"
              onClick={() => handlerPhoneSend(phoneValue)}
            >
              Подтведить
            </button>
          </div>
          <div className="phone__error">{errorMessage && errorMessage}</div>
          <div className="phone__error">
            {!phoneError && 'Введите номер телефона'}
          </div>
        </>
      )}
    </div>
  )
}

export default Phone
