import React from 'react'
import Header from './Header'
import Footer from './Footer'
import DiscountComponent from './DiscountComponent'

const Layaout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {location.pathname !== '/payment' && <DiscountComponent />}
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default Layaout
