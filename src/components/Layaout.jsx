import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import DiscountComponent from "./DiscountComponent";

const Layaout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {location.pathname !== "/payment" && <DiscountComponent />}
      {children}
    </React.Fragment>
  );
};

export default Layaout;
