import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setPayOption } from '../../store/features/itemsSlice'

const PayMethod = () => {
  const [activeMod, setActiveMod] = useState('cash')

  const dispatch = useDispatch()
  const handleOptionChange = () => {
    dispatch(setPayOption(activeMod))
  }

  useEffect(() => {
    handleOptionChange()
  }, [activeMod])

  return (
    <div className="pay">
      <p className="pay__text">Способ оплаты:</p>
      <div className="pay__types">
        <div className="pay__type">
          <div
            className="pay__type__click"
            onClick={() => setActiveMod('cash')}
          >
            <button
              className={`check ${activeMod === 'cash' ? 'checked' : ''}`}
            >
              {activeMod === 'cash' && (
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
            <div className="pay__description">
              <p>Наличными</p>
            </div>
          </div>
        </div>
        <div className="pay__type">
          <div
            className="pay__type__click"
            onClick={() => setActiveMod('card')}
          >
            <button
              className={`check ${activeMod === 'card' ? 'checked' : ''}`}
            >
              {activeMod === 'card' && (
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
            <div className="pay__description">
              <p>Переводом</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayMethod
