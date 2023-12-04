import React from 'react'

import Header from './Header'
import Footer from './Footer'

const Layaout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}

export default Layaout
