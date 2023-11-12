import React from 'react'

import Header from './Header'

const Layaout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}

export default Layaout
