import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPayOption } from "../../store/features/itemsSlice";

const PayMethod = () => {
  const dispatch = useDispatch();
  const { payMethod } = useSelector((state) => state.items);
  const handleOptionChange = (payMethod) => {
    dispatch(setPayOption(payMethod));
  };

  return (
    <div className="pay">
      <p className="pay__text">Способ оплаты:</p>
      <div className="pay__types">
        <div className="pay__type">
          <div
            className="pay__type__click"
            onTouchStart={() => handleOptionChange("cash")}
          >
            <button
              className={`check ${payMethod === "cash" ? "checked" : ""}`}
            >
              {payMethod === "cash" && (
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
            onTouchStart={() => handleOptionChange("card")}
          >
            <button
              className={`check ${payMethod === "card" ? "checked" : ""}`}
            >
              {payMethod === "card" && (
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
  );
};

export default PayMethod;

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="pay__types">
        <div className="pay__type">
          <input
            className="check"
            type="radio"
            id="cash"
            name="pay"
            value="cash"
            checked={payMethod === 'cash'}
            onChange={handleOptionChange}
          />
          <label htmlFor="cash"> Наличными</label>
        </div>
        <div className="pay__type">
          <input
            className="check"
            type="radio"
            id="card"
            name="pay"
            value="card"
            checked={payMethod === 'card'}
            onChange={handleOptionChange}
          />
          <label htmlFor="card">Картой</label>
        </div>
      </div> */
}
