import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPhoneOption } from '../../store/features/itemsSlice'
import IMask from 'imask'

const Phone = ({ phoneError, setPhoneError }) => {
  const dispatch = useDispatch()
  const { phone } = useSelector((state) => state.items)
  const [phoneValue, setPhone] = useState('+7')
  const [errorMessage, setErrorMessage] = useState(false)
  const inputRef = useRef(null)

  const handlerPhoneChange = (event) => {
    setPhoneError(false)
    if (!event.target.value.startsWith('+7')) {
      event.target.value = '+7' + event.target.value.substring(2)
    }
    if (event.target.value.length > 18) {
      event.target.value = event.target.value.slice(0, 18)
    }
    setPhone(event.target.value)
  }

  useEffect(() => {
    if (phoneValue.length === 18) {
      dispatch(setPhoneOption(phoneValue))
    }
    if (inputRef.current) {
      const phoneMask = IMask(inputRef.current, {
        mask: '+{7} (000) 000-00-00',
      })

      return () => {
        phoneMask.destroy()
      }
    }
  }, [handlerPhoneChange])

  const handlerPhoneSend = (phone) => {
    setPhoneError(false)
    if (phone.length === 18) {
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
            <div className="phone__input phone__text-done">{phone}</div>
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
            <p>Введите номер телефона: </p>
          </div>
          <div className="phone__block">
            <div className="phone__input">
              <input
                ref={inputRef}
                type="text"
                value={phoneValue}
                onChange={handlerPhoneChange}
                name="phone"
                id="phone"
                inputMode="numeric"
                onPaste={(e) => {
                  e.preventDefault()
                }}
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
        </>
      )}
      {phoneError && !errorMessage && (
        <p className="phone__error">Введите номер телефона</p>
      )}
    </div>
  )
}

export default Phone
