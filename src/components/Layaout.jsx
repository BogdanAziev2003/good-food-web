import React from 'react'

import Header from './Header'
import DiscountComponent from './DiscountComponent'

const Layaout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <DiscountComponent />
      {children}
    </React.Fragment>
  )
}

export default Layaout
