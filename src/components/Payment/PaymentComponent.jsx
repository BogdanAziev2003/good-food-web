import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClientAddress,
  setSelectedOption,
} from "../../store/features/itemsSlice";
import Delivery from "./Delivery";

const PaymentComponent = ({ addressError, setAddressError }) => {
  const dispatch = useDispatch();
  const { deliveryType } = useSelector((state) => state.items);

  const handleOptionChange = (deliveryType) => {
    dispatch(setSelectedOption(deliveryType));
    if (deliveryType === "pickup") {
      dispatch(setClientAddress(null));
      setAddressError(false);
    }
  };

  return (
    <div className="delivery">
      <div className="delivery__text">
        <p>Спопосб получения заказа:</p>
      </div>
      <div className="delivery__types">
        <div
          className="delivery__type"
          onTouchStart={() => handleOptionChange("pickup")}
        >
          <button
            className={`check ${deliveryType === "pickup" ? "checked" : ""}`}
          >
            {deliveryType === "pickup" && (
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
          onTouchStart={() => handleOptionChange("delivery")}
        >
          <button
            className={`check ${deliveryType === "delivery" ? "checked" : ""}`}
          >
            {deliveryType === "delivery" && (
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
          {deliveryType === "delivery" && (
            <p className="delivery__description__warning">
              * Цена расчитывается без учета доставки
            </p>
          )}
        </div>
        {deliveryType === "delivery" && (
          <Delivery
            addressError={addressError}
            setAddressError={setAddressError}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentComponent;
